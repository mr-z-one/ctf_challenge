
const Utils = {
  clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
  },

  randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  formatTime(date = new Date()) {
    return date.toISOString().replace('T', ' ').split('.')[0];
  },

  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
};

/* -------------------------
   EventEmitter ساده (pub/sub)
   ------------------------- */
class EventEmitter {
  constructor() {
    this._events = Object.create(null);
  }

  on(event, listener) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    if (!this._events[event]) return;
    this._events[event] = this._events[event].filter(l => l !== listener);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }

  emit(event, ...args) {
    if (!this._events[event]) return false;
    // clone listeners so modifications while iterating are safe
    const listeners = this._events[event].slice();
    for (const l of listeners) {
      try {
        l(...args);
      } catch (e) {
        console.error(`[EventEmitter] error in listener for ${event}:`, e);
      }
    }
    return true;
  }
}

/* -------------------------
   مدل داده: Task و TaskList
   ------------------------- */
class Task {
  constructor({ id = null, title = 'untitled', priority = 1, done = false } = {}) {
    this.id = id || Task.generateId();
    this.title = title;
    this.priority = Utils.clamp(priority, 1, 5);
    this.done = Boolean(done);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static generateId() {
    return 't_' + Math.random().toString(36).slice(2, 10);
  }

  toggle() {
    this.done = !this.done;
    this.updatedAt = new Date();
    return this;
  }

  update(fields = {}) {
    if (fields.title !== undefined) this.title = fields.title;
    if (fields.priority !== undefined) this.priority = Utils.clamp(fields.priority, 1, 5);
    if (fields.done !== undefined) this.done = Boolean(fields.done);
    this.updatedAt = new Date();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      priority: this.priority,
      done: this.done,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
}

class TaskList extends EventEmitter {
  constructor(name = 'default') {
    super();
    this.name = name;
    this.tasks = [];
  }

  addTask(taskLike) {
    const task = taskLike instanceof Task ? taskLike : new Task(taskLike);
    this.tasks.push(task);
    this.emit('task:add', task);
    return task;
  }

  removeTaskById(id) {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    const [removed] = this.tasks.splice(idx, 1);
    this.emit('task:remove', removed);
    return removed;
  }

  find(id) {
    return this.tasks.find(t => t.id === id) || null;
  }

  updateTask(id, fields) {
    const t = this.find(id);
    if (!t) return null;
    t.update(fields);
    this.emit('task:update', t);
    return t;
  }

  list({ sortBy = 'priority', desc = true } = {}) {
    const arr = this.tasks.slice();
    arr.sort((a, b) => {
      if (sortBy === 'priority') return desc ? b.priority - a.priority : a.priority - b.priority;
      if (sortBy === 'createdAt') return desc ? b.createdAt - a.createdAt : a.createdAt - b.createdAt;
      return 0;
    });
    return arr;
  }

  toJSON() {
    return {
      name: this.name,
      tasks: this.tasks.map(t => t.toJSON())
    };
  }
}

/* ---------------------------------------------------------
   شبیه‌سازی لایه‌ی شبکه (بدون درخواست واقعی، mock API)
   --------------------------------------------------------- */
const MockAPI = {
  storage: Object.create(null),

  async saveList(list) {
    const key = `list::${list.name}`;
    // simulate latency
    await Utils.sleep(Utils.randInt(50, 250));
    this.storage[key] = Utils.deepClone(list.toJSON());
    return { ok: true, key, ts: Utils.formatTime() };
  },

  async loadList(name) {
    await Utils.sleep(Utils.randInt(50, 200));
    const key = `list::${name}`;
    if (!this.storage[key]) return { ok: false, error: 'not_found' };
    return { ok: true, list: Utils.deepClone(this.storage[key]), ts: Utils.formatTime() };
  },

  async listKeys() {
    await Utils.sleep(Utils.randInt(10, 60));
    return Object.keys(this.storage);
  }
};

/* ---------------------------------------------
   ابزار گزارش‌گیری و لاگ‌زیباسازی (Logger)
   --------------------------------------------- */
const Logger = {
  levels: ['debug', 'info', 'warn', 'error'],
  current: 'debug',

  setLevel(lvl) {
    if (this.levels.includes(lvl)) this.current = lvl;
  },

  _shouldLog(lvl) {
    return this.levels.indexOf(lvl) >= this.levels.indexOf(this.current);
  },

  debug(...args) { if (this._shouldLog('debug')) console.debug('[DEBUG]', ...args); },
  info(...args)  { if (this._shouldLog('info'))  console.info('[INFO]', ...args); },
  warn(...args)  { if (this._shouldLog('warn'))  console.warn('[WARN]', ...args); },
  error(...args) { if (this._shouldLog('error')) console.error('[ERROR]', ...args); }
};

/* -------------------------
   یک ماژول زمان‌بندی (Scheduler)
   ------------------------- */
class Scheduler extends EventEmitter {
  constructor() {
    super();
    this._tasks = new Map();
  }

  schedule(id, fn, ms) {
    if (this._tasks.has(id)) this.cancel(id);
    const timer = setTimeout(async () => {
      try {
        await fn();
        this.emit('task:done', id);
      } catch (e) {
        this.emit('task:error', id, e);
      } finally {
        this._tasks.delete(id);
      }
    }, ms);
    this._tasks.set(id, timer);
    this.emit('task:scheduled', id, ms);
    return id;
  }

  cancel(id) {
    if (!this._tasks.has(id)) return false;
    clearTimeout(this._tasks.get(id));
    this._tasks.delete(id);
    this.emit('task:cancelled', id);
    return true;
  }

  cancelAll() {
    for (const id of this._tasks.keys()) this.cancel(id);
    this.emit('task:cancelAll');
  }

  count() {
    return this._tasks.size;
  }
}


async function demo() {
  Logger.setLevel('debug');
  Logger.info('شروع دمو در', Utils.formatTime());

  // ساخت یک لیست تسک
  const myList = new TaskList('personal');
  myList.on('task:add', t => Logger.debug('Task added:', t.toJSON()));
  myList.on('task:update', t => Logger.debug('Task updated:', t.toJSON()));
  myList.on('task:remove', t => Logger.debug('Task removed:', t.toJSON()));

  // افزودن چند تسک
  const t1 = myList.addTask({ title: 'خرید مواد غذایی', priority: 3 });
  const t2 = myList.addTask({ title: 'یادگیری الگوریتم', priority: 5 });
  const t3 = myList.addTask({ title: 'تماس با دوست', priority: 2 });

  // آپدیت کردن یکی
  await Utils.sleep(80);
  myList.updateTask(t1.id, { done: true });
  await Utils.sleep(40);
  myList.updateTask(t2.id, { priority: 4 });

  // نمایش لیست مرتب‌شده
  Logger.info('لیست مرتب‌شده بر اساس priority:');
  for (const t of myList.list({ sortBy: 'priority' })) {
    Logger.info(`- ${t.title} [priority=${t.priority}] done=${t.done}`);
  }

  // ذخیره در MockAPI
  const saveResult = await MockAPI.saveList(myList);
  Logger.info('saveResult:', saveResult);
/* good job! next level: /Dtwdmec3Wt */

  // بارگذاری
  const loadResult = await MockAPI.loadList('personal');
  if (loadResult.ok) {
    Logger.info('بارگذاری موفق — تعداد تسک‌ها:', loadResult.list.tasks.length);
  } else {
    Logger.warn('بارگذاری ناموفق:', loadResult.error);
  }

  // استفاده از Scheduler
  const sched = new Scheduler();
  sched.on('task:scheduled', (id, ms) => Logger.debug(`Scheduled ${id} in ${ms}ms`));
  sched.on('task:done', id => Logger.info(`Scheduled task done: ${id}`));

  sched.schedule('reminder-1', async () => {
    Logger.info('یادآور اجرا شد — بررسی لیست و ارسال خلاصه...');
    // خلاصه ساده
    const remaining = myList.list({ sortBy: 'priority', desc: false }).filter(t => !t.done);
    Logger.info('remaining tasks:', remaining.map(r => r.title).join(', ') || '(none)');
  }, 300);

  // منتظر بمون برای مشاهده خروجی دمو
  await Utils.sleep(350);

  // پاک‌سازی
  sched.cancelAll();
  Logger.info('پایان دمو در', Utils.formatTime());
}

/* -------------------------
   ماژولهای اضافه: helper برای اجرا از محیط node/browser
   ------------------------- */
(function bootstrap() {
  // در صورت اکسترنال بودن محیط، دمو را اجرا کن (ولی اجباری نیست)
  if (typeof window === 'undefined') {
    // node.js
    if (typeof module !== 'undefined' && require) {
      // فقط وقتی این فایل مستقیماً اجرا شود، demo را فراخوانی می‌کنیم
      if (require.main === module) {
        demo().catch(e => {
          console.error('Demo error:', e);
          process.exit(1);
        });
      }
    } else {
  
      demo().catch(e => console.error(e));
    }
  } else {

    window.__BIG_SCRIPT__ = { demo, Utils, Task, TaskList, MockAPI, Scheduler, Logger };
    console.info('bigScript loaded. call window.__BIG_SCRIPT__.demo() to run demo.');
  }
});




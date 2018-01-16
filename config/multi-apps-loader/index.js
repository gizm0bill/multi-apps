const path = require('path');
const NodeWatchFileSystem = require('webpack/lib/node/NodeWatchFileSystem');


const dev = Math.floor(Math.random() * 10000);

// Implements fs.Stats.
class VirtualFileStats {
  constructor(path, content) {
    this._path = path;
    this._content = content;

    this._ctime = new Date();
    this._mtime = new Date();
    this._atime = new Date();
    this._btime = new Date();
    this._dev = dev;
    this._ino = Math.floor(Math.random() * 100000);
    this._mode = parseInt('777', 8);  // RWX for everyone.
    this._uid = process.env['UID'] || 0;
    this._gid = process.env['GID'] || 0;
  }

  get path() { return this._path; }
  get content() { return this._content; }

  isFile() { return true; }
  isDirectory() { return false; }
  isBlockDevice() { return false; }
  isCharacterDevice() { return false; }
  isSymbolicLink() { return false; }
  isFIFO() { return false; }
  isSocket() { return false; }

  get dev() { return this._dev; }
  get ino() { return this._ino; }
  get mode() { return this._mode; }
  get nlink() { return 1; }  // Default to 1 hard link.
  get uid() { return this._uid; }
  get gid() { return this._gid; }
  get rdev() { return 0; }
  get size() { return this._content.length; }
  get blksize() { return 512; }
  get blocks() { return Math.ceil(this.size / this.blksize); }
  get atime() { return this._atime; }
  get mtime() { return this._mtime; }
  get ctime() { return this._ctime; }
  get birthtime() { return this._btime; }
}

// Decorator for Webpack's file system, allows adding virtual files.
class VirtualFileSystemDecorator {
  constructor(baseDir) {
    // baseDir is used for selectively logging file lookups.
    this._baseDir = baseDir;
    this.virtualFiles = new Map();
  }

  addFile(path, content) {
    const stats = new VirtualFileStats(path, content);
    this.virtualFiles.set(path, stats);
  }

  updateInputfileSystem(inputFileSystem) {
    this._inputFileSystem = inputFileSystem;
  }

  getVirtualFilesStats() {
    return Array.from(this.virtualFiles.values());
  }

  _log(prefix, path) {
    if (path.includes(this._baseDir)) {
      console.log('##', prefix, path);
    }
  }

  _readFileSync(path) {
    if (this.virtualFiles.has(path)) {
      return this.virtualFiles.get(path).content;
    }

    return null;
  }

  _statSync(path) {
    if (this.virtualFiles.has(path)) {
      return this.virtualFiles.get(path);
    }

    return null;
  }

  stat(path, callback) {
    this._log('stat', path)
    const result = this._statSync(path);
    if (result) {
      callback(null, result);
    } else {
      this._inputFileSystem.stat(path, callback);
    }
  }

  readdir(path, callback) {
    this._inputFileSystem.readdir(path, callback);
  }

  readFile(path, callback) {
    this._log('readFile', path)
    const result = this._readFileSync(path);
    if (result) {
      callback(null, result);
    } else {
      this._inputFileSystem.readFile(path, callback);
    }
  }

  readJson(path, callback) {
    this._inputFileSystem.readJson(path, callback);
  }

  readlink(path, callback) {
    this._inputFileSystem.readlink(path, callback);
  }

  statSync(path) {
    this._log('statSync', path)
    const result = this._statSync(path);
    return result || this._inputFileSystem.statSync(path);
  }

  readdirSync(path) {
    return this._inputFileSystem.readdirSync(path);
  }

  readFileSync(path) {
    this._log('readFileSync', path)
    const result = this._readFileSync(path);
    return result || this._inputFileSystem.readFileSync(path);
  }

  readJsonSync(path) {
    return this._inputFileSystem.readJsonSync(path);
  }

  readlinkSync(path) {
    return this._inputFileSystem.readlinkSync(path);
  }

  purge(changes) {
    if (this._inputFileSystem.purge) {
      this._inputFileSystem.purge(changes);
    }
  }
}

class VirtualWatchFileSystemDecorator extends NodeWatchFileSystem {
  constructor(virtualInputFileSystem) {
    super(virtualInputFileSystem);
  }

  watch(files, dirs, missing, startTime, options, callback, callbackUndelayed) {
    const newCallback = (err, filesModified, contextModified, missingModified, fileTimestamps, contextTimestamps) => {
      debugger;
      const virtualFilesStats = this.inputFileSystem.getVirtualFilesStats();
      // fileTimestamps and contextTimestamps are the same object, so we can just write to one of them.
      virtualFilesStats.forEach(stats => fileTimestamps[stats.path] = +stats.mtime);
      callback(err, filesModified, contextModified, missingModified, fileTimestamps, contextTimestamps);
    }
    return super.watch(files, dirs, missing, startTime, options, newCallback, callbackUndelayed);
  }
}


class VirtualFilesPlugin {
  constructor(baseDir, files) {
    this.vfsd = new VirtualFileSystemDecorator(baseDir);
    console.log( baseDir, files )
    files.forEach((file) =>
      this.vfsd.addFile(path.resolve(baseDir, file.path), file.content)
    );
  }
  apply(compiler) {
    // Decorate inputFileSystem to serve virtual files.
    // Use decorated inputFileSystem in watchFileSystem.
    this.vfsd.updateInputfileSystem(compiler.inputFileSystem);
    compiler.plugin('environment', () => {
      compiler.inputFileSystem = this.vfsd;
      compiler.watchFileSystem = new VirtualWatchFileSystemDecorator(compiler.inputFileSystem);
    });
  }
}

module.exports = VirtualFilesPlugin;
/*
 * Nodeventure client JS
 *
 * Display code that runs in the context of the iframe
 */

(function () {
  "use strict";

  function DisplayAPI() {
    this.iframe = null;
    this.reset();
  }
  
  DisplayAPI.prototype.reset = function () {
    this._queue = null;
    if (this.iframe) {
      this.iframe.parentNode.removeChild(this.iframe);
    }
    
    var parent = document.querySelector('#display');
    this.iframe = document.createElement('iframe');
    parent.appendChild(this.iframe);
    this.doc = this.iframe.contentDocument;
    this.win = this.iframe.contentWindow;
    this.win.display = this;

    this.addScript("//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");

  };
  
  DisplayAPI.prototype._run = function (fn) {
    if (this._queue) {
      this._queue.push(fn);
    } else {
      fn.call(this);
    }
  };

  DisplayAPI.prototype._flushQueue = function () {
    var that = this;
    if (!this._queue) return;
    var rest = this._queue.slice(1);
    var next = this._queue[0];
    this._queue = null;
    if (next) {
      next.call(this);
    }
    rest.forEach(function (x) {
      that._run(x);
    });
  };

  DisplayAPI.prototype.addScript = function (script) {
    var that = this;
    this._run(function () {
      this._queue = [];
      var scriptEl = this.doc.createElement("script");
      scriptEl.src = script;
      scriptEl.onload = function () {
        that._flushQueue();
      };
      this.doc.body.appendChild(scriptEl);
    });
  };


  DisplayAPI.prototype.eval = function (string, args) {
    this._run(function () {
      var wrapped = "with (" +JSON.stringify(args || {}) + ") {" + string + "}";
      this.win.eval(wrapped);
    });
  };

  
  // id, x and y are optional
  DisplayAPI.prototype.show = function (imageUrl, id, style) {
    this._run(function () {
      if (id != null) {
        var el = this.doc.getElementById(id)
        if (el) {
          el.parentNode.removeChild(el);
        }
      }
      var img = this.doc.createElement('img');
      img.src = imageUrl;
      img.style.position = 'absolute';
      this.doc.body.appendChild(img);
      for(var s in style) {
        img.style[s] = style[s];
      }
      if (id != null) {
        img.id = id;
      }
    });
  };

  window.display = new DisplayAPI();
})();


	
'use strict';
    
function cancelEvent (event) {
  event = event || window.event;
  if (event) {
    event = event.originalEvent || event;

    if (event.stopPropagation) event.stopPropagation();
    if (event.preventDefault) event.preventDefault();
  }

  return false;
}

function getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

//ConfigStorage
(function(window)
{
    var keyPrefix = '';
    var noPrefix = false;
    var cache = {};
    var useCs = !!(window.chrome && chrome.storage && chrome.storage.local);
    var useLs = !useCs && !!window.localStorage;

    function storageSetPrefix(newPrefix)
    {
        keyPrefix = newPrefix;
    }

    function storageSetNoPrefix()
    {
        noPrefix = true;
    }

    function storageGetPrefix()
    {
        if (noPrefix)
        {
            noPrefix = false;
            return '';
        }
        return keyPrefix;
    }

    function storageGetValue()
    {
        var keys = Array.prototype.slice.call(arguments),
            callback = keys.pop(),
            result = [],
            single = keys.length == 1,
            value,
            allFound = true,
            prefix = storageGetPrefix(),
            i, key;

        for (i = 0; i < keys.length; i++)
        {
            key = keys[i] = prefix + keys[i];
            if (key.substr(0, 3) != 'xt_' && cache[key] !== undefined)
            {
                result.push(cache[key]);
            }
            else if (useLs)
            {
                try
                {
                    value = localStorage.getItem(key);
                }
                catch (e)
                {
                    useLs = false;
                }
                try
                {
                    value = (value === undefined || value === null) ? false : JSON.parse(value);
                }
                catch (e)
                {
                    value = false;
                }
                result.push(cache[key] = value);
            }
            else if (!useCs)
            {
                result.push(cache[key] = false);
            }
            else
            {
                allFound = false;
            }
        }

        if (allFound)
        {
            return callback(single ? result[0] : result);
        }

        chrome.storage.local.get(keys, function(resultObj)
        {
            var value;
            result = [];
            for (i = 0; i < keys.length; i++)
            {
                key = keys[i];
                value = resultObj[key];
                value = value === undefined || value === null ? false : JSON.parse(value);
                result.push(cache[key] = value);
            }

            callback(single ? result[0] : result);
        });
    };

    function storageSetValue(obj, callback)
    {
        var keyValues = {},
            prefix = storageGetPrefix(),
            key, value;

        for (key in obj)
        {
            if (obj.hasOwnProperty(key))
            {
                value = obj[key];
                key = prefix + key;
                cache[key] = value;
                value = JSON.stringify(value);
                if (useLs)
                {
                    try
                    {
                        localStorage.setItem(key, value);
                    }
                    catch (e)
                    {
                        useLs = false;
                    }
                }
                else
                {
                    keyValues[key] = value;
                }
            }
        }

        if (useLs || !useCs)
        {
            if (callback)
            {
                callback();
            }
            return;
        }

        chrome.storage.local.set(keyValues, callback);
    };

    function storageRemoveValue()
    {
        var keys = Array.prototype.slice.call(arguments),
            prefix = storageGetPrefix(),
            i, key, callback;

        if (typeof keys[keys.length - 1] === 'function')
        {
            callback = keys.pop();
        }

        for (i = 0; i < keys.length; i++)
        {
            key = keys[i] = prefix + keys[i];
            delete cache[key];
            if (useLs)
            {
                try
                {
                    localStorage.removeItem(key);
                }
                catch (e)
                {
                    useLs = false;
                }
            }
        }
        if (useCs)
        {
            chrome.storage.local.remove(keys, callback);
        }
        else if (callback)
        {
            callback();
        }
    };

    window.ConfigStorage = {
        prefix: storageSetPrefix,
        noPrefix: storageSetNoPrefix,
        get: storageGetValue,
        set: storageSetValue,
        remove: storageRemoveValue
    };


})(this);



// Generated by CoffeeScript 1.9.3

	

(function() {
  this.EmojiPicker = (function() {
    function EmojiPicker(options) {
      var ref, ref1;
      if (options == null) {
        options = {};
      }
      $.emojiarea.iconSize = (ref = options.iconSize) != null ? ref : 25;
      $.emojiarea.assetsPath = (ref1 = options.assetsPath) != null ? ref1 : '';
      this.generateEmojiIconSets(options);
      if (!options.emojiable_selector) {
        options.emojiable_selector = '[data-emojiable=true]';
      }
      this.options = options;
    }

    EmojiPicker.prototype.discover = function() {
      var isiOS;
      isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isiOS) {
        return;
      }
      return $(this.options.emojiable_selector).emojiarea($.extend({
        emojiPopup: this,
        norealTime: true
      }, this.options));
    };

    EmojiPicker.prototype.generateEmojiIconSets = function(options) {
      var column, dataItem, hex, i, icons, j, name, reverseIcons, row, totalColumns;
      icons = {};
      reverseIcons = {};
      i = void 0;
      j = void 0;
      hex = void 0;
      name = void 0;
      dataItem = void 0;
      row = void 0;
      column = void 0;
      totalColumns = void 0;
      j = 0;
      while (j < Config.EmojiCategories.length) {
        totalColumns = Config.EmojiCategorySpritesheetDimens[j][1];
        i = 0;
        while (i < Config.EmojiCategories[j].length) {
          dataItem = Config.Emoji[Config.EmojiCategories[j][i]];
          name = dataItem[1][0];
          row = Math.floor(i / totalColumns);
          column = i % totalColumns;
          icons[':' + name + ':'] = [j, row, column, ':' + name + ':'];
          reverseIcons[name] = dataItem[0];
          i++;
        }
        j++;
      }
      $.emojiarea.icons = icons;
      return $.emojiarea.reverseIcons = reverseIcons;
    };

    EmojiPicker.prototype.colonToUnicode = function(input) {
      if (!input) {
        return '';
      }
      if (!Config.rx_colons) {
        Config.init_unified();
      }
      return input.replace(Config.rx_colons, function(m) {
        var val;
        val = Config.mapcolon[m];
        if (val) {
          return val;
        } else {
          return '';
        }
      });
    };

    EmojiPicker.prototype.unicodeToImage = function(input) {
      if (!input) {
        return '';
      }
      if (!Config.rx_codes) {
        Config.init_unified();
      }
      return input.replace(Config.rx_codes, function(m) {
        var $img, val;
        val = Config.reversemap[m];
        if (val) {
          val = ':' + val + ':';
          $img = $.emojiarea.createIcon($.emojiarea.icons[val]);
          return $img;
        } else {
          return '';
        }
      });
    };

    EmojiPicker.prototype.colonToImage = function(input) {
      if (!input) {
        return '';
      }
      if (!Config.rx_colons) {
        Config.init_unified();
      }
      return input.replace(Config.rx_colons, function(m) {
        var $img;
        if (m) {
          $img = $.emojiarea.createIcon($.emojiarea.icons[m]);
          return $img;
        } else {
          return '';
        }
      });
    };

    return EmojiPicker;

  })();

}).call(this);

//# sourceMappingURL=emoji-picker.js.map

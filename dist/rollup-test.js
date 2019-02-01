var script = {
  // props: ['slots', 'options', 'item'],
  props: {
    'slots': {
      type: Object,
      default: function() { return {} }
    },
    'options': {
      type: Object,
      default: function() { return {} }
    },
    'item': {
      type: Object,
      default: function() { return {} }
    },
  },
  beforeCreate() {
    // console.log('TopicComponent.vue beforeCreate is running, this:', this);
  },
  created() {
    // console.log('TopicComponent.vue created is running, this.$props.slots:', this.$props.slots);
  },
  computed: {
    nullValue() {
      const options = this.options || {};
      return options.nullValue;
    },
  },
  methods: {
    evaluateSlot(valOrGetter, transforms = [], nullValue = '') {
      // console.log('evaluateSlot is running, valOrGetter:', valOrGetter);
      // check for null val/getter
      if (!valOrGetter) {
        return valOrGetter;
      }

      const valOrGetterType = typeof valOrGetter;
      let val;

      // fn
      if (valOrGetterType === 'function') {
        const state = this.$store.state;
        const controller = this.$controller;
        const getter = valOrGetter;

        // const getterText = String(getter);
        // const depsRe = /state(\.\w+)+/g;
        // const depsText = getterText.match(depsRe);
        // const deps = depsText.map(eval);

        const item = this.item;
        // console.log('in evaluateSlot, item:', item);

        // if this comp is associated with an "item" (generally some object
        // from a list of things, e.g. dor parcels), pass the item itself
        // as well when evaluating
        if (item) {
          val = getter(state, item, controller);
        } else {
          // console.log('evaluateSlot, about to get value');
          val = getter(state);
          // console.log('state:', state, 'val:', val);
        }
      } else {
        val = valOrGetter;
      }

      // format nulls but not falses
      if (val === false) ; else if (!val) {
        return nullValue;
      }

      // apply transforms
      for (let transformKey of transforms) {
        // get transform definition from config by name
        const transform = this.$config.transforms[transformKey];
        // make object of (relevant) globals by filtering window object
        let globals;
        const globalKeys = transform.globals;
        if (globalKeys) {
          globals = Object.keys(window)
                        .filter(key => globalKeys.includes(key))
                        .reduce((obj, key) => {
                            obj[key] = window[key];
                            return obj;
                        }, {});
        }
        // run transform
        const fn = transform.transform;
        val = fn(val, globals);
      }

      return val;
    },

    // not sure how children can use this. `this` isn't binding correctly at
    // the time the child gets instantiated.
    // getComputedProperties() {
    //   const slots = this.slots;
    //   return Object.keys(slots).reduce((o, key) => {
    //     const valOrGetter = slots[key];
    //     // wrap slot val/getter in evaluator fn
    //     o[key] = () => {
    //       this.evaluateSlot(valOrGetter);
    //     }
    //     return o;
    //   }, {});
    // }
  },
};

/* script */
            const __vue_script__ = script;
            
/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3\\src\\components\\TopicComponent.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var TopicComponent = __vue_normalize__(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//
// import ExternalLink from './ExternalLink.vue';

var script$1 = {
  name: 'Badge',
  mixins: [TopicComponent],
  components: {
    // ExternalLink,
  },
  computed: {
    style() {
      const titleBackgroundValOrFn = (this.options || {}).titleBackground;
      let titleBackground;

      if (titleBackgroundValOrFn) {
        if (typeof titleBackgroundValOrFn === 'function') {
          titleBackground = titleBackgroundValOrFn(this.$store.state);
        } else {
          titleBackground = titleBackgroundValOrFn;
        }
      } else {
        titleBackground = '#444';
      }

      return { background: titleBackground };
    },
    // externalLinkAction() {
    //   return this.evaluateSlot(this.options.externalLink.action) || 'See more at ';
    // },
    // externalLinkText() {
    //   const externalLinkConf = this.options.externalLink;
    //   const actionFn = externalLinkConf.action;
    //   const name = this.externalLinkAction || '';
    //   return `${name}`;
    // },
    // externalLinkHref() {
    //   return this.evaluateSlot(this.options.externalLink.href);
    // },
  }
};

/* script */
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "center" },
    [
      _c("div", { staticClass: "mb-badge panel" }, [
        _c("div", { staticClass: "mb-badge-header", style: _vm.style }, [
          _vm._v(
            "\n      " + _vm._s(_vm.evaluateSlot(_vm.slots.title)) + "\n    "
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "mb-badge-body" }, [
          _c("h1", [_vm._v(_vm._s(_vm.evaluateSlot(_vm.slots.value)))]),
          _vm._v(" "),
          _c("strong", [
            _vm._v(_vm._s(_vm.evaluateSlot(_vm.slots.description)))
          ])
        ])
      ]),
      _vm._v(" "),
      _vm.options && _vm.options.externalLink
        ? _c("external-link", {
            attrs: { options: _vm.options.externalLink, type: "badge" }
          })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-11fe0870_0", { source: "\n.mb-badge[data-v-11fe0870] {\n  /*width: 300px;*/\n  padding: 0;\n  margin: 0 auto;\n  margin-bottom: inherit;\n}\n@media (max-width: 640px) {\n.mb-badge[data-v-11fe0870] {\n    width: 100%;\n}\n}\n\n/*REVIEW this should use foundation classes*/\n@media (min-width: 640px) {\n.mb-badge[data-v-11fe0870] {\n    width: 325px;\n}\n}\n.mb-badge-header[data-v-11fe0870] {\n  color: #fff;\n  font-weight: bold;\n  text-align: center;\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n.mb-badge-body[data-v-11fe0870] {\n  padding: 12px;\n}\n.mb-badge-body > h1[data-v-11fe0870] {\n  margin: 0;\n  margin-bottom: 5px;\n}\n", map: {"version":3,"sources":["C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3/C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3\\src\\components\\Badge.vue"],"names":[],"mappings":";AAyEA;EACA,iBAAA;EACA,WAAA;EACA,eAAA;EACA,uBAAA;CACA;AAEA;AACA;IACA,YAAA;CACA;CACA;;AAEA,6CAAA;AACA;AACA;IACA,aAAA;CACA;CACA;AAEA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,iBAAA;EACA,oBAAA;CACA;AAEA;EACA,cAAA;CACA;AAEA;EACA,UAAA;EACA,mBAAA;CACA","file":"Badge.vue","sourcesContent":["<template>\r\n  <!-- REVIEW this uses patterns -->\r\n  <div class=\"center\">\r\n    <div class=\"mb-badge panel\">\r\n      <div class=\"mb-badge-header\" :style=\"style\">\r\n        {{ evaluateSlot(slots.title) }}\r\n      </div>\r\n      <div class=\"mb-badge-body\">\r\n        <h1>{{ evaluateSlot(slots.value) }}</h1>\r\n        <strong>{{ evaluateSlot(slots.description) }}</strong>\r\n      </div>\r\n    </div>\r\n    <external-link v-if=\"options && options.externalLink\"\r\n                   :options=\"options.externalLink\"\r\n                   :type=\"'badge'\"\r\n    />\r\n    <!-- <div class=\"external-link\">\r\n      <a v-if=\"options && options.externalLink\"\r\n      :href=\"externalLinkHref\"\r\n      class=\"external external-link\"\r\n      target=\"_blank\"\r\n      >\r\n      {{ externalLinkText }}\r\n      </a>\r\n    </div> -->\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n  // console.log('in Badge.vue script');\r\n  import TopicComponent from './TopicComponent.vue';\r\n  // import ExternalLink from './ExternalLink.vue';\r\n\r\n  export default {\r\n    name: 'Badge',\r\n    mixins: [TopicComponent],\r\n    components: {\r\n      // ExternalLink,\r\n    },\r\n    computed: {\r\n      style() {\r\n        const titleBackgroundValOrFn = (this.options || {}).titleBackground;\r\n        let titleBackground;\r\n\r\n        if (titleBackgroundValOrFn) {\r\n          if (typeof titleBackgroundValOrFn === 'function') {\r\n            titleBackground = titleBackgroundValOrFn(this.$store.state);\r\n          } else {\r\n            titleBackground = titleBackgroundValOrFn;\r\n          }\r\n        } else {\r\n          titleBackground = '#444';\r\n        }\r\n\r\n        return { background: titleBackground };\r\n      },\r\n      // externalLinkAction() {\r\n      //   return this.evaluateSlot(this.options.externalLink.action) || 'See more at ';\r\n      // },\r\n      // externalLinkText() {\r\n      //   const externalLinkConf = this.options.externalLink;\r\n      //   const actionFn = externalLinkConf.action;\r\n      //   const name = this.externalLinkAction || '';\r\n      //   return `${name}`;\r\n      // },\r\n      // externalLinkHref() {\r\n      //   return this.evaluateSlot(this.options.externalLink.href);\r\n      // },\r\n    }\r\n  };\r\n</script>\r\n\r\n<style scoped>\r\n  .mb-badge {\r\n    /*width: 300px;*/\r\n    padding: 0;\r\n    margin: 0 auto;\r\n    margin-bottom: inherit;\r\n  }\r\n\r\n  @media (max-width: 640px) {\r\n    .mb-badge {\r\n      width: 100%;\r\n    }\r\n  }\r\n\r\n  /*REVIEW this should use foundation classes*/\r\n  @media (min-width: 640px) {\r\n    .mb-badge {\r\n      width: 325px;\r\n    }\r\n  }\r\n\r\n  .mb-badge-header {\r\n    color: #fff;\r\n    font-weight: bold;\r\n    text-align: center;\r\n    padding-top: 2px;\r\n    padding-bottom: 2px;\r\n  }\r\n\r\n  .mb-badge-body {\r\n    padding: 12px;\r\n  }\r\n\r\n  .mb-badge-body > h1 {\r\n    margin: 0;\r\n    margin-bottom: 5px;\r\n  }\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-11fe0870";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3\\src\\components\\Badge.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var Badge = __vue_normalize__$1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    __vue_create_injector__,
    undefined
  );

//
// import TopicComponentGroup from './TopicComponentGroup.vue'

var script$2 = {
  mixins: [TopicComponent],
  computed: {
    calloutClass() {
      if (this.$props.options) {
        if (this.$props.options.class) {
          return this.$props.options.class;
        } else {
          return 'columns small-24';
        }
      }
    },
    message() {
      if (this.$props.slots) {
        return this.evaluateSlot(this.$props.slots.text) || '';
      } else {
        return '';
      }
    },
    components() {
      if (this.$props.options) {
        return this.$props.options.components || null;
      } else {
        return null;
      }
    },
  },
  components: {},
  // beforeCreate() {
  //   this.$options.components.TopicComponentGroup = TopicComponentGroup;
  // }
};

/* script */
            const __vue_script__$2 = script$2;
            
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wrapper grid-y" }, [
    _c("div", { class: "callout " + this.calloutClass }, [
      this.message
        ? _c("p", { domProps: { innerHTML: _vm._s(this.message) } })
        : _vm._e()
    ])
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-86df0b0a_0", { source: "\n.wrapper[data-v-86df0b0a] {\n}\n.callout[data-v-86df0b0a] {\r\n  margin-top: 1rem;\r\n  position: inherit;\r\n  height: auto;\n}\r\n\r\n", map: {"version":3,"sources":["C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3/C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3\\src\\components\\Callout.vue"],"names":[],"mappings":";AAsDA;CAEA;AAEA;EACA,iBAAA;EACA,kBAAA;EACA,aAAA;CACA","file":"Callout.vue","sourcesContent":["<template>\r\n  <div class='wrapper grid-y'>\r\n    <!-- <div class=\"callout columns small-24\"> -->\r\n    <div :class=\"'callout ' + this.calloutClass\">\r\n      <p v-if=\"this.message\"\r\n         v-html=\"this.message\"\r\n      />\r\n      <!-- <topic-component-group :topic-components=\"this.components\"\r\n                             v-if=\"this.components\"\r\n      /> -->\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n  import TopicComponent from './TopicComponent.vue';\r\n  // import TopicComponentGroup from './TopicComponentGroup.vue'\r\n\r\n  export default {\r\n    mixins: [TopicComponent],\r\n    computed: {\r\n      calloutClass() {\r\n        if (this.$props.options) {\r\n          if (this.$props.options.class) {\r\n            return this.$props.options.class;\r\n          } else {\r\n            return 'columns small-24';\r\n          }\r\n        }\r\n      },\r\n      message() {\r\n        if (this.$props.slots) {\r\n          return this.evaluateSlot(this.$props.slots.text) || '';\r\n        } else {\r\n          return '';\r\n        }\r\n      },\r\n      components() {\r\n        if (this.$props.options) {\r\n          return this.$props.options.components || null;\r\n        } else {\r\n          return null;\r\n        }\r\n      },\r\n    },\r\n    components: {},\r\n    // beforeCreate() {\r\n    //   this.$options.components.TopicComponentGroup = TopicComponentGroup;\r\n    // }\r\n  };\r\n</script>\r\n\r\n<style scoped>\r\n\r\n.wrapper {\r\n\r\n}\r\n\r\n.callout {\r\n  margin-top: 1rem;\r\n  position: inherit;\r\n  height: auto;\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-86df0b0a";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3\\src\\components\\Callout.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$1() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var Callout = __vue_normalize__$2(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    __vue_create_injector__$1,
    undefined
  );

//

var script$3 = {
  mixins: [TopicComponent],
  props: ['count', 'limit', 'type'],
  computed: {
    // for horizontal tables only
    externalLinkCount() {
      return this.count - this.limit;
    },
    // for horizontal or vertical tables
    externalLinkAction() {
      const actionFn = this.options.action;
      if (actionFn) {
        return actionFn(this.externalLinkCount) || 'See more at ';
      }
    },
    // for anything else, for getting data from the state
    externalLinkDataFromState() {
      // return this.options.externalLink.action || 'See more at ';
      const stateData = this.options.data;
      return this.evaluateSlot(stateData);
    },
    externalLinkText() {
      if (this.options) {
        const name = this.options.name  || '';
        // const preText = this.options.preText;
        // const postText = this.options.postText;

        if (this.type === 'vertical-table') {
        // if (this.externalLinkAction) {
          if (name) {
            return `${this.externalLinkAction} at ${name}`;
          } else {
            return `${this.externalLinkAction}`;
          }
        } else if (this.type === 'horizontal-table') {
          // if (name) {
          //   return `${this.externalLinkAction} at ${name}`;
          // } else {
            return `${this.externalLinkAction}`;
          // }
        } else {
          return `${this.externalLinkDataFromState}`
        }
      } else {
        return null;
      }
    },
    externalLinkHref() {
      if (this.options) {
        return this.evaluateSlot(this.options.href);
      } else {
        return null;
      }
    },
    // the number of items that aren't being shown (e.g. See 54 more...)
  }
};

/* script */
            const __vue_script__$3 = script$3;
            
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "external-link" }, [
    _c("a", { attrs: { target: "_blank", href: _vm.externalLinkHref } }, [
      _vm._v("\n    " + _vm._s(_vm.externalLinkText) + "\n  ")
    ])
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-28225bd2_0", { source: "\n.external-link[data-v-28225bd2] {\r\n  padding-top: 5px;\n}\r\n\r\n", map: {"version":3,"sources":["C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3/C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3\\src\\components\\ExternalLink.vue"],"names":[],"mappings":";AA2EA;EACA,iBAAA;CACA","file":"ExternalLink.vue","sourcesContent":["<template>\r\n  <div class=\"external-link\">\r\n    <a target=\"_blank\"\r\n       :href=\"externalLinkHref\"\r\n    >\r\n      {{ externalLinkText }}\r\n    </a>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n  import TopicComponent from './TopicComponent.vue';\r\n\r\n  export default {\r\n    mixins: [TopicComponent],\r\n    props: ['count', 'limit', 'type'],\r\n    computed: {\r\n      // for horizontal tables only\r\n      externalLinkCount() {\r\n        return this.count - this.limit;\r\n      },\r\n      // for horizontal or vertical tables\r\n      externalLinkAction() {\r\n        const actionFn = this.options.action;\r\n        if (actionFn) {\r\n          return actionFn(this.externalLinkCount) || 'See more at ';\r\n        }\r\n      },\r\n      // for anything else, for getting data from the state\r\n      externalLinkDataFromState() {\r\n        // return this.options.externalLink.action || 'See more at ';\r\n        const stateData = this.options.data;\r\n        return this.evaluateSlot(stateData);\r\n      },\r\n      externalLinkText() {\r\n        if (this.options) {\r\n          const name = this.options.name  || '';\r\n          // const preText = this.options.preText;\r\n          // const postText = this.options.postText;\r\n\r\n          if (this.type === 'vertical-table') {\r\n          // if (this.externalLinkAction) {\r\n            if (name) {\r\n              return `${this.externalLinkAction} at ${name}`;\r\n            } else {\r\n              return `${this.externalLinkAction}`;\r\n            }\r\n          } else if (this.type === 'horizontal-table') {\r\n            // if (name) {\r\n            //   return `${this.externalLinkAction} at ${name}`;\r\n            // } else {\r\n              return `${this.externalLinkAction}`;\r\n            // }\r\n          } else {\r\n            return `${this.externalLinkDataFromState}`\r\n          }\r\n        } else {\r\n          return null;\r\n        }\r\n      },\r\n      externalLinkHref() {\r\n        if (this.options) {\r\n          return this.evaluateSlot(this.options.href);\r\n        } else {\r\n          return null;\r\n        }\r\n      },\r\n      // the number of items that aren't being shown (e.g. See 54 more...)\r\n    }\r\n  };\r\n\r\n</script>\r\n\r\n<style scoped>\r\n\r\n.external-link {\r\n  padding-top: 5px;\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-28225bd2";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3\\src\\components\\ExternalLink.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$2() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var ExternalLink = __vue_normalize__$3(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    __vue_create_injector__$2,
    undefined
  );

//

var script$4 = {
  mixins: [TopicComponent],
};

/* script */
            const __vue_script__$4 = script$4;
            
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "list" }, [
    _vm.evaluateSlot(_vm.slots.relatedAddresses)
      ? _c(
          "ul",
          _vm._l(_vm.evaluateSlot(_vm.slots.relatedAddresses), function(
            relatedAddress
          ) {
            return _c("li", [
              _c(
                "a",
                {
                  attrs: {
                    href:
                      "#/" +
                      encodeURIComponent(
                        relatedAddress.properties.street_address
                      )
                  }
                },
                [
                  _vm._v(
                    "\n        " +
                      _vm._s(relatedAddress.properties.street_address) +
                      "\n      "
                  )
                ]
              )
            ])
          })
        )
      : _c("p", { staticClass: "message-p" }, [
          _vm._v("\n    No related addresses were found for this address.\n  ")
        ])
  ])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-ded8694c_0", { source: "\n.list[data-v-ded8694c] {\r\n  position: inherit;\r\n  margin-bottom: 0px !important;\n}\nul[data-v-ded8694c] {\r\n  list-style: none;\r\n  padding-left: 0;\r\n  margin-left: 0;\n}\n.message-p[data-v-ded8694c] {\r\n  margin-bottom: 0px;\n}\r\n\r\n/*.topic-body {\r\n  margin-bottom: 0px;\r\n}*/\r\n\r\n", map: {"version":3,"sources":["C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3/C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3\\src\\components\\List.vue"],"names":[],"mappings":";AA6BA;EACA,kBAAA;EACA,8BAAA;CACA;AAEA;EACA,iBAAA;EACA,gBAAA;EACA,eAAA;CACA;AAEA;EACA,mBAAA;CACA;;AAEA;;GAEA","file":"List.vue","sourcesContent":["<template>\r\n  <div class=\"list\">\r\n    <ul v-if=\"evaluateSlot(slots.relatedAddresses)\">\r\n      <li v-for=\"relatedAddress in evaluateSlot(slots.relatedAddresses)\"\r\n      >\r\n        <a :href=\"'#/' + encodeURIComponent(relatedAddress.properties.street_address)\"\r\n        >\r\n          {{ relatedAddress.properties.street_address }}\r\n        </a>\r\n      </li>\r\n    </ul>\r\n    <p v-else\r\n       class=\"message-p\"\r\n    >\r\n      No related addresses were found for this address.\r\n    </p>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n  import TopicComponent from './TopicComponent.vue';\r\n\r\n  export default {\r\n    mixins: [TopicComponent],\r\n  };\r\n</script>\r\n\r\n<style scoped>\r\n\r\n.list {\r\n  position: inherit;\r\n  margin-bottom: 0px !important;\r\n}\r\n\r\nul {\r\n  list-style: none;\r\n  padding-left: 0;\r\n  margin-left: 0;\r\n}\r\n\r\n.message-p {\r\n  margin-bottom: 0px;\r\n}\r\n\r\n/*.topic-body {\r\n  margin-bottom: 0px;\r\n}*/\r\n\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-ded8694c";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "C:\\Users\\andy.rothwell\\Projects\\rollup_vue_3\\src\\components\\List.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$3() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var List = __vue_normalize__$4(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    __vue_create_injector__$3,
    undefined
  );

const initialState = {
  // configurableInputCategorySelected: '',
  // configurableInputValueEntered: '',
  shouldShowAddressCandidateList: false,
  popover: {
    open: false,
    text: '',
    options: {},
  },
  fullScreenTopicsEnabled: false,
};

const pvcStore = {
  state: initialState,
  mutations: {
    // setConfigurableInputCategorySelected(state, payload) {
    //   state.configurableInputCategorySelected = payload;
    // },
    // setConfigurableInputValueEntered(state, payload) {
    //   state.configurableInputValueEntered = payload;
    // },
    setShouldShowAddressCandidateList(state, payload) {
      state.shouldShowAddressCandidateList = payload;
    },
    setPopoverOpen(state, payload) {
      state.popover.open = payload;
    },
    setPopoverText(state, payload) {
      state.popover.text = payload;
    },
    setPopoverOptions(state, payload) {
      state.popover.options = payload;
    },
    setFullScreenTopicsEnabled(state, payload) {
      state.fullScreenTopicsEnabled = payload;
    },
  }
};

export { Badge, Callout, ExternalLink, TopicComponent, List, pvcStore };

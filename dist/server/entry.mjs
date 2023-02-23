globalThis.process = {
	argv: [],
	env: Deno.env.toObject(),
};
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// dist/server/chunks/astro.1790c127.mjs
function Mime$1() {
  this._types = /* @__PURE__ */ Object.create(null);
  this._extensions = /* @__PURE__ */ Object.create(null);
  for (let i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }
  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key = str.slice(index, eqIdx).trim();
    if (void 0 === obj[key]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e) {
    return str;
  }
}
function attachToResponse(response, cookies) {
  Reflect.set(response, astroCookiesSymbol, cookies);
}
function getFromResponse(response) {
  let cookies = Reflect.get(response, astroCookiesSymbol);
  if (cookies != null) {
    return cookies;
  } else {
    return void 0;
  }
}
function* getSetCookiesFromResponse(response) {
  const cookies = getFromResponse(response);
  if (!cookies) {
    return;
  }
  for (const headerValue of cookies.headers()) {
    yield headerValue;
  }
}
function normalizeLF(code) {
  return code.replace(/\r\n|\r(?!\n)|\n/g, "\n");
}
function getErrorDataByCode(code) {
  const entry = Object.entries(AstroErrorData).find((data6) => data6[1].code === code);
  if (entry) {
    return {
      name: entry[0],
      data: entry[1]
    };
  }
}
function codeFrame(src, loc) {
  if (!loc || loc.line === void 0 || loc.column === void 0) {
    return "";
  }
  const lines = normalizeLF(src).split("\n").map((ln) => ln.replace(/\t/g, "  "));
  const visibleLines = [];
  for (let n = -2; n <= 2; n++) {
    if (lines[loc.line + n])
      visibleLines.push(loc.line + n);
  }
  let gutterWidth = 0;
  for (const lineNo of visibleLines) {
    let w = `> ${lineNo}`;
    if (w.length > gutterWidth)
      gutterWidth = w.length;
  }
  let output = "";
  for (const lineNo of visibleLines) {
    const isFocusedLine = lineNo === loc.line - 1;
    output += isFocusedLine ? "> " : "  ";
    output += `${lineNo + 1} | ${lines[lineNo]}
`;
    if (isFocusedLine)
      output += `${Array.from({ length: gutterWidth }).join(" ")}  | ${Array.from({
        length: loc.column
      }).join(" ")}^
`;
  }
  return output;
}
function validateArgs(args) {
  if (args.length !== 3)
    return false;
  if (!args[0] || typeof args[0] !== "object")
    return false;
  return true;
}
function baseCreateComponent(cb, moduleId) {
  var _a2;
  const name = ((_a2 = moduleId == null ? void 0 : moduleId.split("/").pop()) == null ? void 0 : _a2.replace(".astro", "")) ?? "";
  const fn = (...args) => {
    if (!validateArgs(args)) {
      throw new AstroError({
        ...AstroErrorData.InvalidComponentArgs,
        message: AstroErrorData.InvalidComponentArgs.message(name)
      });
    }
    return cb(...args);
  };
  Object.defineProperty(fn, "name", { value: name, writable: false });
  fn.isAstroComponentFactory = true;
  fn.moduleId = moduleId;
  return fn;
}
function createComponentWithOptions(opts) {
  const cb = baseCreateComponent(opts.factory, opts.moduleId);
  cb.propagation = opts.propagation;
  return cb;
}
function createComponent(arg1, moduleId) {
  if (typeof arg1 === "function") {
    return baseCreateComponent(arg1, moduleId);
  } else {
    return createComponentWithOptions(arg1);
  }
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(site) {
  return {
    site: site ? new URL(site) : void 0,
    generator: `Astro v${ASTRO_VERSION}`,
    glob: createAstroGlobFn()
  };
}
function getHandlerFromModule(mod, method) {
  if (mod[method]) {
    return mod[method];
  }
  if (method === "delete" && mod["del"]) {
    return mod["del"];
  }
  if (mod["all"]) {
    return mod["all"];
  }
  return void 0;
}
async function renderEndpoint(mod, context, ssr) {
  var _a2;
  const { request, params } = context;
  const chosenMethod = (_a2 = request.method) == null ? void 0 : _a2.toLowerCase();
  const handler = getHandlerFromModule(mod, chosenMethod);
  if (!ssr && ssr === false && chosenMethod && chosenMethod !== "get") {
    console.warn(`
${chosenMethod} requests are not available when building a static site. Update your config to output: 'server' to handle ${chosenMethod} requests.`);
  }
  if (!handler || typeof handler !== "function") {
    let response = new Response(null, {
      status: 404,
      headers: {
        "X-Astro-Response": "Not-Found"
      }
    });
    return response;
  }
  if (handler.length > 1) {
    console.warn(`
API routes with 2 arguments have been deprecated. Instead they take a single argument in the form of:

export function get({ params, request }) {
	//...
}

Update your code to remove this warning.`);
  }
  const proxy = new Proxy(context, {
    get(target, prop) {
      if (prop in target) {
        return Reflect.get(target, prop);
      } else if (prop in params) {
        console.warn(`
API routes no longer pass params as the first argument. Instead an object containing a params property is provided in the form of:

export function get({ params }) {
	// ...
}

Update your code to remove this warning.`);
        return Reflect.get(params, prop);
      } else {
        return void 0;
      }
    }
  });
  return handler.call(mod, proxy, request);
}
function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}
function isPromise(value) {
  return !!value && typeof value === "object" && typeof value.then === "function";
}
async function* streamAsyncIterator(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done)
        return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
function isHTMLString(value) {
  return Object.prototype.toString.call(value) === "[object HTMLString]";
}
function markHTMLBytes(bytes) {
  return new HTMLBytes(bytes);
}
function hasGetReader(obj) {
  return typeof obj.getReader === "function";
}
async function* unescapeChunksAsync(iterable) {
  if (hasGetReader(iterable)) {
    for await (const chunk of streamAsyncIterator(iterable)) {
      yield unescapeHTML(chunk);
    }
  } else {
    for await (const chunk of iterable) {
      yield unescapeHTML(chunk);
    }
  }
}
function* unescapeChunks(iterable) {
  for (const chunk of iterable) {
    yield unescapeHTML(chunk);
  }
}
function unescapeHTML(str) {
  if (!!str && typeof str === "object") {
    if (str instanceof Uint8Array) {
      return markHTMLBytes(str);
    } else if (str instanceof Response && str.body) {
      const body6 = str.body;
      return unescapeChunksAsync(body6);
    } else if (typeof str.then === "function") {
      return Promise.resolve(str).then((value) => {
        return unescapeHTML(value);
      });
    } else if (Symbol.iterator in str) {
      return unescapeChunks(str);
    } else if (Symbol.asyncIterator in str || hasGetReader(str)) {
      return unescapeChunksAsync(str);
    }
  }
  return markHTMLString(str);
}
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [Renderer]: "astro:jsx",
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}
function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value), shouldEscape);
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toAttributeString(toStyleString(value), shouldEscape)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _2, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}
function renderAllHeadContent(result) {
  result._metadata.hasRenderedHead = true;
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement$1("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement$1("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement$1("link", link, false));
  let content = links.join("\n") + styles.join("\n") + scripts.join("\n");
  if (result.extraHead.length > 0) {
    for (const part of result.extraHead) {
      content += part;
    }
  }
  return markHTMLString(content);
}
function* renderHead(result) {
  yield { type: "head", result };
}
function* maybeRenderHead(result) {
  if (result._metadata.hasRenderedHead) {
    return;
  }
  yield { type: "maybe-head", result, scope: result.scope };
}
function addScopeFlag(result, flag) {
  result.scope |= flag;
}
function hasScopeFlag(result, flag) {
  return (result.scope & flag) === flag;
}
function createScopedResult(result, flag) {
  const scopedResult = Object.create(result, {
    scope: {
      writable: true,
      value: result.scope
    }
  });
  if (flag != null) {
    addScopeFlag(scopedResult, flag);
  }
  return scopedResult;
}
function isHeadAndContent(obj) {
  return typeof obj === "object" && !!obj[headAndContentSym];
}
function createHeadAndContent(head, content) {
  return {
    [headAndContentSym]: true,
    head,
    content
  };
}
function isRenderTemplateResult(obj) {
  return typeof obj === "object" && !!obj[renderTemplateResultSym];
}
async function* renderAstroTemplateResult(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
function renderTemplate(htmlParts, ...expressions) {
  return new RenderTemplateResult(htmlParts, expressions);
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
async function renderToString(result, componentFactory, props, children) {
  const scoped = createScopedResult(result, ScopeFlags.Astro);
  const factoryResult = await componentFactory(scoped, props, children);
  if (factoryResult instanceof Response) {
    const response = factoryResult;
    throw response;
  }
  let parts = new HTMLParts();
  const templateResult = isHeadAndContent(factoryResult) ? factoryResult.content : factoryResult;
  for await (const chunk of renderAstroTemplateResult(templateResult)) {
    parts.append(chunk, result);
  }
  return parts.toString();
}
function isAPropagatingComponent(result, factory) {
  let hint = factory.propagation || "none";
  if (factory.moduleId && result.propagation.has(factory.moduleId) && hint === "none") {
    hint = result.propagation.get(factory.moduleId);
  }
  return hint === "in-tree" || hint === "self";
}
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, JSON.stringify(Array.from(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}
function extractDirectives(displayName, inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new AstroError(AstroErrorData.MissingMediaQueryDirective);
          }
          break;
        }
      }
    } else if (key === "class:list") {
      if (value) {
        extracted.props[key.slice(0, -5)] = serializeListValue(value);
      }
    } else {
      extracted.props[key] = value;
    }
  }
  for (const sym of Object.getOwnPropertySymbols(inputProps)) {
    extracted.props[sym] = inputProps[sym];
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}
function validateComponentProps(props, displayName) {
  if (props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
function createAstroComponentInstance(result, displayName, factory, props, slots = {}) {
  validateComponentProps(props, displayName);
  const instance = new AstroComponentInstance(result, props, slots, factory);
  if (isAPropagatingComponent(result, factory) && !result.propagators.has(factory)) {
    result.propagators.set(factory, instance);
  }
  return instance;
}
function isAstroComponentInstance(obj) {
  return typeof obj === "object" && !!obj[astroComponentInstanceSym];
}
async function* renderChild(child) {
  child = await child;
  if (child instanceof SlotString) {
    if (child.instructions) {
      yield* child.instructions;
    }
    yield child;
  } else if (isHTMLString(child)) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0)
    ;
  else if (isRenderTemplateResult(child)) {
    yield* renderAstroTemplateResult(child);
  } else if (isAstroComponentInstance(child)) {
    yield* child.render();
  } else if (ArrayBuffer.isView(child)) {
    yield child;
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    yield* child;
  } else {
    yield child;
  }
}
function isSlotString(str) {
  return !!str[slotString];
}
async function renderSlot(result, slotted, fallback) {
  if (slotted) {
    const scoped = createScopedResult(result, ScopeFlags.Slot);
    let iterator = renderChild(typeof slotted === "function" ? slotted(scoped) : slotted);
    let content = "";
    let instructions = null;
    for await (const chunk of iterator) {
      if (typeof chunk.type === "string") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(new SlotString(content, instructions));
  }
  if (fallback) {
    return renderSlot(result, fallback);
  }
  return "";
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}
function stringifyChunk(result, chunk) {
  if (typeof chunk.type === "string") {
    const instruction = chunk;
    switch (instruction.type) {
      case "directive": {
        const { hydration } = instruction;
        let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
        let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
        let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
        if (prescriptType) {
          let prescripts = getPrescripts(prescriptType, hydration.directive);
          return markHTMLString(prescripts);
        } else {
          return "";
        }
      }
      case "head": {
        if (result._metadata.hasRenderedHead) {
          return "";
        }
        return renderAllHeadContent(result);
      }
      case "maybe-head": {
        if (result._metadata.hasRenderedHead) {
          return "";
        }
        const scope = instruction.scope;
        switch (scope) {
          case ScopeFlags.JSX | ScopeFlags.Slot | ScopeFlags.Astro:
          case ScopeFlags.JSX | ScopeFlags.Astro | ScopeFlags.HeadBuffer:
          case ScopeFlags.JSX | ScopeFlags.Slot | ScopeFlags.Astro | ScopeFlags.HeadBuffer: {
            return "";
          }
          case ScopeFlags.JSX | ScopeFlags.Astro: {
            if (hasScopeFlag(result, ScopeFlags.JSX)) {
              return "";
            }
            break;
          }
          case ScopeFlags.Slot:
          case ScopeFlags.Slot | ScopeFlags.HeadBuffer: {
            if (hasScopeFlag(result, ScopeFlags.RenderSlot)) {
              return "";
            }
            break;
          }
          case ScopeFlags.HeadBuffer: {
            if (hasScopeFlag(result, ScopeFlags.JSX | ScopeFlags.HeadBuffer)) {
              return "";
            }
            break;
          }
          case ScopeFlags.RenderSlot | ScopeFlags.Astro:
          case ScopeFlags.RenderSlot | ScopeFlags.Astro | ScopeFlags.JSX:
          case ScopeFlags.RenderSlot | ScopeFlags.Astro | ScopeFlags.JSX | ScopeFlags.HeadBuffer: {
            return "";
          }
        }
        return renderAllHeadContent(result);
      }
    }
  } else {
    if (isSlotString(chunk)) {
      let out = "";
      const c = chunk;
      if (c.instructions) {
        for (const instr of c.instructions) {
          out += stringifyChunk(result, instr);
        }
      }
      out += chunk.toString();
      return out;
    }
    return chunk.toString();
  }
}
function chunkToByteArray(result, chunk) {
  if (chunk instanceof Uint8Array) {
    return chunk;
  }
  let stringified = stringifyChunk(result, chunk);
  return encoder.encode(stringified.toString());
}
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  let skip;
  if (vnode.props) {
    if (vnode.props[Skip.symbol]) {
      skip = vnode.props[Skip.symbol];
    } else {
      skip = new Skip(vnode);
    }
  } else {
    skip = new Skip(vnode);
  }
  return renderJSXVNode(result, vnode, skip);
}
async function renderJSXVNode(result, vnode, skip) {
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        const scoped = createScopedResult(result, ScopeFlags.JSX);
        const html4 = markHTMLString(await renderToString(scoped, vnode.type, props, slots));
        return html4;
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots2.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots2[child.props.slot] = [..._slots2[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots2.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skip.increment();
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function") {
        if (skip.haveNoTried() || skip.isCompleted()) {
          useConsoleFilter();
          try {
            const output2 = await vnode.type(vnode.props ?? {});
            let renderResult;
            if (output2 && output2[AstroJSX]) {
              renderResult = await renderJSXVNode(result, output2, skip);
              return renderResult;
            } else if (!output2) {
              renderResult = await renderJSXVNode(result, output2, skip);
              return renderResult;
            }
          } catch (e) {
            if (skip.isCompleted()) {
              throw e;
            }
            skip.increment();
          } finally {
            finishUsingConsoleFilter();
          }
        } else {
          skip.increment();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots2 = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots2[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots2)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      props[Skip.symbol] = skip;
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponentToIterable(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponentToIterable(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let parts = new HTMLParts();
        for await (const chunk of output) {
          parts.append(chunk, result);
        }
        return markHTMLString(parts.toString());
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error2) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}
function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue (jsx)"];
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid-js",
        "@astrojs/vue",
        "@astrojs/svelte",
        "@astrojs/lit"
      ];
  }
}
function isFragmentComponent(Component) {
  return Component === Fragment;
}
function isHTMLComponent(Component) {
  return Component && typeof Component === "object" && Component["astro:html"];
}
async function renderFrameworkComponent(result, displayName, Component, _props, slots = {}) {
  var _a2, _b;
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers: renderers2 } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(displayName, _props);
  let html4 = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  const validRenderers = renderers2.filter((r) => r.name !== "astro:jsx");
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer = renderers2.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error2;
      for (const r of renderers2) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error2 ?? (error2 = e);
        }
      }
      if (!renderer && error2) {
        throw error2;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers2.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && validRenderers.length === 1) {
      renderer = validRenderers[0];
    }
    if (!renderer) {
      const extname = (_a2 = metadata.componentUrl) == null ? void 0 : _a2.split(".").pop();
      renderer = renderers2.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new AstroError({
        ...AstroErrorData.NoClientOnlyHint,
        message: AstroErrorData.NoClientOnlyHint.message(metadata.displayName),
        hint: AstroErrorData.NoClientOnlyHint.hint(
          probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")
        )
      });
    } else if (typeof Component !== "string") {
      const matchingRenderers = validRenderers.filter(
        (r) => probableRendererNames.includes(r.name)
      );
      const plural = validRenderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new AstroError({
          ...AstroErrorData.NoMatchingRenderer,
          message: AstroErrorData.NoMatchingRenderer.message(
            metadata.displayName,
            (_b = metadata == null ? void 0 : metadata.componentUrl) == null ? void 0 : _b.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: AstroErrorData.NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r) => "`" + r + "`"))
          )
        });
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html: html4, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html4 = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html: html4, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new AstroError({
      ...AstroErrorData.NoClientEntrypoint,
      message: AstroErrorData.NoClientEntrypoint.message(
        displayName,
        metadata.hydrate,
        renderer.name
      )
    });
  }
  if (!html4 && typeof Component === "string") {
    const Tag = sanitizeElementName(Component);
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroTemplateResult(
      await renderTemplate`<${Tag}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Tag) ? `/>` : `>${childSlots}</${Tag}>`
      )}`
    );
    html4 = "";
    for await (const chunk of iterable) {
      html4 += chunk;
    }
  }
  if (!hydration) {
    return async function* () {
      if (slotInstructions) {
        yield* slotInstructions;
      }
      if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
        yield html4;
      } else if (html4 && html4.length > 0) {
        yield markHTMLString(html4.replace(/\<\/?astro-slot\>/g, ""));
      } else {
        yield "";
      }
    }();
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html4}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html4) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html4.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html4 ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    if (slotInstructions) {
      yield* slotInstructions;
    }
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement$1("astro-island", island, false));
  }
  return renderAll();
}
function sanitizeElementName(tag) {
  const unsafe = /[&<>'"\s]+/g;
  if (!unsafe.test(tag))
    return tag;
  return tag.trim().split(unsafe)[0].trim();
}
async function renderFragmentComponent(result, slots = {}) {
  const children = await renderSlot(result, slots == null ? void 0 : slots.default);
  if (children == null) {
    return children;
  }
  return markHTMLString(children);
}
async function renderHTMLComponent(result, Component, _props, slots = {}) {
  const { slotInstructions, children } = await renderSlots(result, slots);
  const html4 = Component.render({ slots: children });
  const hydrationHtml = slotInstructions ? slotInstructions.map((instr) => stringifyChunk(result, instr)).join("") : "";
  return markHTMLString(hydrationHtml + html4);
}
function renderComponent(result, displayName, Component, props, slots = {}) {
  if (isPromise(Component)) {
    return Promise.resolve(Component).then((Unwrapped) => {
      return renderComponent(result, displayName, Unwrapped, props, slots);
    });
  }
  if (isFragmentComponent(Component)) {
    return renderFragmentComponent(result, slots);
  }
  if (isHTMLComponent(Component)) {
    return renderHTMLComponent(result, Component, props, slots);
  }
  if (isAstroComponentFactory(Component)) {
    return createAstroComponentInstance(result, displayName, Component, props, slots);
  }
  return renderFrameworkComponent(result, displayName, Component, props, slots);
}
function renderComponentToIterable(result, displayName, Component, props, slots = {}) {
  const renderResult = renderComponent(result, displayName, Component, props, slots);
  if (isAstroComponentInstance(renderResult)) {
    return renderResult.render();
  }
  return renderResult;
}
function createResponseClass() {
  var _isStream, _body, _a2;
  StreamingCompatibleResponse = (_a2 = class extends Response {
    constructor(body6, init2) {
      let isStream = body6 instanceof ReadableStream;
      super(isStream ? null : body6, init2);
      __privateAdd$2(this, _isStream, void 0);
      __privateAdd$2(this, _body, void 0);
      __privateSet$2(this, _isStream, isStream);
      __privateSet$2(this, _body, body6);
    }
    get body() {
      return __privateGet$2(this, _body);
    }
    async text() {
      if (__privateGet$2(this, _isStream) && isNodeJS) {
        let decoder2 = new TextDecoder();
        let body6 = __privateGet$2(this, _body);
        let out = "";
        for await (let chunk of streamAsyncIterator(body6)) {
          out += decoder2.decode(chunk);
        }
        return out;
      }
      return super.text();
    }
    async arrayBuffer() {
      if (__privateGet$2(this, _isStream) && isNodeJS) {
        let body6 = __privateGet$2(this, _body);
        let chunks = [];
        let len = 0;
        for await (let chunk of streamAsyncIterator(body6)) {
          chunks.push(chunk);
          len += chunk.length;
        }
        let ab = new Uint8Array(len);
        let offset = 0;
        for (const chunk of chunks) {
          ab.set(chunk, offset);
          offset += chunk.length;
        }
        return ab;
      }
      return super.arrayBuffer();
    }
  }, _isStream = /* @__PURE__ */ new WeakMap(), _body = /* @__PURE__ */ new WeakMap(), _a2);
  return StreamingCompatibleResponse;
}
function nonAstroPageNeedsHeadInjection(pageComponent) {
  return needsHeadRenderingSymbol in pageComponent && !!pageComponent[needsHeadRenderingSymbol];
}
async function iterableToHTMLBytes(result, iterable, onDocTypeInjection) {
  const parts = new HTMLParts();
  let i = 0;
  for await (const chunk of iterable) {
    if (isHTMLString(chunk)) {
      if (i === 0) {
        i++;
        if (!/<!doctype html/i.test(String(chunk))) {
          parts.append("<!DOCTYPE html>\n", result);
          if (onDocTypeInjection) {
            await onDocTypeInjection(parts);
          }
        }
      }
    }
    parts.append(chunk, result);
  }
  return parts.toArrayBuffer();
}
async function bufferHeadContent(result) {
  const iterator = result.propagators.values();
  const scoped = createScopedResult(result, ScopeFlags.HeadBuffer);
  while (true) {
    const { value, done } = iterator.next();
    if (done) {
      break;
    }
    const returnValue = await value.init(scoped);
    if (isHeadAndContent(returnValue)) {
      result.extraHead.push(returnValue.head);
    }
  }
}
async function renderPage$1(result, componentFactory, props, children, streaming, route) {
  if (!isAstroComponentFactory(componentFactory)) {
    const pageProps = { ...props ?? {}, "server:root": true };
    let output;
    try {
      const renderResult = await renderComponent(
        result,
        componentFactory.name,
        componentFactory,
        pageProps,
        null
      );
      if (isAstroComponentInstance(renderResult)) {
        output = renderResult.render();
      } else {
        output = renderResult;
      }
    } catch (e) {
      if (AstroError.is(e) && !e.loc) {
        e.setLocation({
          file: route == null ? void 0 : route.component
        });
      }
      throw e;
    }
    const bytes = await iterableToHTMLBytes(result, output, async (parts) => {
      if (nonAstroPageNeedsHeadInjection(componentFactory)) {
        for await (let chunk of maybeRenderHead(result)) {
          parts.append(chunk, result);
        }
      }
    });
    return new Response(bytes, {
      headers: new Headers([
        ["Content-Type", "text/html; charset=utf-8"],
        ["Content-Length", bytes.byteLength.toString()]
      ])
    });
  }
  const factoryReturnValue = await componentFactory(result, props, children);
  const factoryIsHeadAndContent = isHeadAndContent(factoryReturnValue);
  if (isRenderTemplateResult(factoryReturnValue) || factoryIsHeadAndContent) {
    await bufferHeadContent(result);
    const templateResult = factoryIsHeadAndContent ? factoryReturnValue.content : factoryReturnValue;
    let iterable = renderAstroTemplateResult(templateResult);
    let init2 = result.response;
    let headers = new Headers(init2.headers);
    let body6;
    if (streaming) {
      body6 = new ReadableStream({
        start(controller) {
          async function read() {
            let i = 0;
            try {
              for await (const chunk of iterable) {
                if (isHTMLString(chunk)) {
                  if (i === 0) {
                    if (!/<!doctype html/i.test(String(chunk))) {
                      controller.enqueue(encoder.encode("<!DOCTYPE html>\n"));
                    }
                  }
                }
                const bytes = chunkToByteArray(result, chunk);
                controller.enqueue(bytes);
                i++;
              }
              controller.close();
            } catch (e) {
              if (AstroError.is(e) && !e.loc) {
                e.setLocation({
                  file: route == null ? void 0 : route.component
                });
              }
              controller.error(e);
            }
          }
          read();
        }
      });
    } else {
      body6 = await iterableToHTMLBytes(result, iterable);
      headers.set("Content-Length", body6.byteLength.toString());
    }
    let response = createResponse(body6, { ...init2, headers });
    return response;
  }
  if (!(factoryReturnValue instanceof Response)) {
    throw new AstroError({
      ...AstroErrorData.OnlyResponseCanBeReturned,
      message: AstroErrorData.OnlyResponseCanBeReturned.message(
        route == null ? void 0 : route.route,
        typeof factoryReturnValue
      ),
      location: {
        file: route == null ? void 0 : route.component
      }
    });
  }
  return factoryReturnValue;
}
function renderStyleElement(children) {
  return renderElement$1("style", {
    props: {},
    children
  });
}
function renderScriptElement({ props, children }) {
  return renderElement$1("script", {
    props,
    children
  });
}
function renderStylesheet({ href }) {
  return renderElement$1(
    "link",
    {
      props: {
        rel: stylesheetRel,
        href
      },
      children: ""
    },
    false
  );
}
function renderUniqueStylesheet(result, link) {
  for (const existingLink of result.links) {
    if (existingLink.props.rel === stylesheetRel && existingLink.props.href === link.href) {
      return "";
    }
  }
  return renderStylesheet(link);
}
function __astro_tag_component__(Component, rendererName) {
  if (!Component)
    return;
  if (typeof Component !== "function")
    return;
  Object.defineProperty(Component, Renderer, {
    value: rendererName,
    enumerable: false,
    writable: false
  });
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}
function init(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
  return function(txt) {
    if (!$.enabled || txt == null)
      return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
function log(opts, level, type, message) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    type,
    level,
    message
  };
  if (levels[logLevel] > levels[level]) {
    return;
  }
  dest.write(event);
}
function warn(opts, type, message) {
  return log(opts, "warn", type, message);
}
function error(opts, type, message) {
  return log(opts, "error", type, message);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function validateGetStaticPathsParameter([key, value], route) {
  if (!VALID_PARAM_TYPES.includes(typeof value)) {
    throw new AstroError({
      ...AstroErrorData.GetStaticPathsInvalidRouteParam,
      message: AstroErrorData.GetStaticPathsInvalidRouteParam.message(key, value, typeof value),
      location: {
        file: route
      }
    });
  }
}
function validateDynamicRouteModule(mod, {
  ssr,
  logging,
  route
}) {
  if (ssr && mod.getStaticPaths && !mod.prerender) {
    warn(logging, "getStaticPaths", 'getStaticPaths() is ignored when "output: server" is set.');
  }
  if ((!ssr || mod.prerender) && !mod.getStaticPaths) {
    throw new AstroError({
      ...AstroErrorData.GetStaticPathsRequired,
      location: { file: route.component }
    });
  }
}
function validateGetStaticPathsResult(result, logging, route) {
  if (!Array.isArray(result)) {
    throw new AstroError({
      ...AstroErrorData.InvalidGetStaticPathsReturn,
      message: AstroErrorData.InvalidGetStaticPathsReturn.message(typeof result),
      location: {
        file: route.component
      }
    });
  }
  result.forEach((pathObject) => {
    if (pathObject.params === void 0 || pathObject.params === null || pathObject.params && Object.keys(pathObject.params).length === 0) {
      throw new AstroError({
        ...AstroErrorData.GetStaticPathsExpectedParams,
        location: {
          file: route.component
        }
      });
    }
    if (typeof pathObject.params !== "object") {
      throw new AstroError({
        ...AstroErrorData.InvalidGetStaticPathParam,
        message: AstroErrorData.InvalidGetStaticPathParam.message(typeof pathObject.params),
        location: {
          file: route.component
        }
      });
    }
    for (const [key, val] of Object.entries(pathObject.params)) {
      if (!(typeof val === "undefined" || typeof val === "string" || typeof val === "number")) {
        warn(
          logging,
          "getStaticPaths",
          `invalid path param: ${key}. A string, number or undefined value was expected, but got \`${JSON.stringify(
            val
          )}\`.`
        );
      }
      if (typeof val === "string" && val === "") {
        warn(
          logging,
          "getStaticPaths",
          `invalid path param: ${key}. \`undefined\` expected for an optional param, but got empty string.`
        );
      }
    }
  });
}
function getParams(array) {
  const fn = (match) => {
    const params = {};
    array.forEach((key, i) => {
      if (key.startsWith("...")) {
        params[key.slice(3)] = match[i + 1] ? decodeURIComponent(match[i + 1]) : void 0;
      } else {
        params[key] = decodeURIComponent(match[i + 1]);
      }
    });
    return params;
  };
  return fn;
}
function stringifyParams(params, routeComponent) {
  const validatedParams = Object.entries(params).reduce((acc, next) => {
    validateGetStaticPathsParameter(next, routeComponent);
    const [key, value] = next;
    acc[key] = value == null ? void 0 : value.toString();
    return acc;
  }, {});
  return JSON.stringify(validatedParams, Object.keys(params).sort());
}
function onlyAvailableInSSR(name) {
  return function _onlyAvailableInSSR() {
    switch (name) {
      case "Astro.redirect":
        throw new AstroError(AstroErrorData.StaticRedirectNotAvailable);
    }
  };
}
function getFunctionExpression(slot) {
  var _a2;
  if (!slot)
    return;
  if (((_a2 = slot.expressions) == null ? void 0 : _a2.length) !== 1)
    return;
  return slot.expressions[0];
}
function createResult(args) {
  const { markdown, params, pathname, renderers: renderers2, request, resolve } = args;
  const url6 = new URL(request.url);
  const headers = new Headers();
  headers.set("Content-Type", "text/html");
  const response = {
    status: args.status,
    statusText: "OK",
    headers
  };
  Object.defineProperty(response, "headers", {
    value: response.headers,
    enumerable: true,
    writable: false
  });
  let cookies = void 0;
  const result = {
    styles: args.styles ?? /* @__PURE__ */ new Set(),
    scripts: args.scripts ?? /* @__PURE__ */ new Set(),
    links: args.links ?? /* @__PURE__ */ new Set(),
    propagation: args.propagation ?? /* @__PURE__ */ new Map(),
    propagators: /* @__PURE__ */ new Map(),
    extraHead: [],
    scope: 0,
    cookies,
    createAstro(astroGlobal, props, slots) {
      const astroSlots = new Slots(result, slots, args.logging);
      const Astro = {
        __proto__: astroGlobal,
        get clientAddress() {
          if (!(clientAddressSymbol$1 in request)) {
            if (args.adapterName) {
              throw new AstroError({
                ...AstroErrorData.ClientAddressNotAvailable,
                message: AstroErrorData.ClientAddressNotAvailable.message(args.adapterName)
              });
            } else {
              throw new AstroError(AstroErrorData.StaticClientAddressNotAvailable);
            }
          }
          return Reflect.get(request, clientAddressSymbol$1);
        },
        get cookies() {
          if (cookies) {
            return cookies;
          }
          cookies = new AstroCookies(request);
          result.cookies = cookies;
          return cookies;
        },
        params,
        props,
        request,
        url: url6,
        redirect: args.ssr ? (path, status) => {
          return new Response(null, {
            status: status || 302,
            headers: {
              Location: path
            }
          });
        } : onlyAvailableInSSR("Astro.redirect"),
        response,
        slots: astroSlots
      };
      Object.defineProperty(Astro, "__renderMarkdown", {
        enumerable: false,
        writable: false,
        value: async function(content, opts) {
          if (typeof Deno !== "undefined") {
            throw new Error("Markdown is not supported in Deno SSR");
          }
          if (!renderMarkdown) {
            let astroRemark = "@astrojs/";
            astroRemark += "markdown-remark";
            renderMarkdown = (await import(astroRemark)).renderMarkdown;
          }
          const { code } = await renderMarkdown(content, { ...markdown, ...opts ?? {} });
          return code;
        }
      });
      return Astro;
    },
    resolve,
    _metadata: {
      renderers: renderers2,
      pathname,
      hasHydrationScript: false,
      hasRenderedHead: false,
      hasDirectives: /* @__PURE__ */ new Set()
    },
    response
  };
  return result;
}
function generatePaginateFunction(routeMatch) {
  return function paginateUtility(data6, args = {}) {
    let { pageSize: _pageSize, params: _params, props: _props } = args;
    const pageSize = _pageSize || 10;
    const paramName = "page";
    const additionalParams = _params || {};
    const additionalProps = _props || {};
    let includesFirstPageNumber;
    if (routeMatch.params.includes(`...${paramName}`)) {
      includesFirstPageNumber = false;
    } else if (routeMatch.params.includes(`${paramName}`)) {
      includesFirstPageNumber = true;
    } else {
      throw new AstroError({
        ...AstroErrorData.PageNumberParamNotFound,
        message: AstroErrorData.PageNumberParamNotFound.message(paramName)
      });
    }
    const lastPage = Math.max(1, Math.ceil(data6.length / pageSize));
    const result = [...Array(lastPage).keys()].map((num) => {
      const pageNum = num + 1;
      const start2 = pageSize === Infinity ? 0 : (pageNum - 1) * pageSize;
      const end = Math.min(start2 + pageSize, data6.length);
      const params = {
        ...additionalParams,
        [paramName]: includesFirstPageNumber || pageNum > 1 ? String(pageNum) : void 0
      };
      return {
        params,
        props: {
          ...additionalProps,
          page: {
            data: data6.slice(start2, end),
            start: start2,
            end: end - 1,
            size: pageSize,
            total: data6.length,
            currentPage: pageNum,
            lastPage,
            url: {
              current: routeMatch.generate({ ...params }),
              next: pageNum === lastPage ? void 0 : routeMatch.generate({ ...params, page: String(pageNum + 1) }),
              prev: pageNum === 1 ? void 0 : routeMatch.generate({
                ...params,
                page: !includesFirstPageNumber && pageNum - 1 === 1 ? "" : String(pageNum - 1)
              })
            }
          }
        }
      };
    });
    return result;
  };
}
async function callGetStaticPaths({
  isValidate,
  logging,
  mod,
  route,
  ssr
}) {
  validateDynamicRouteModule(mod, { ssr, logging, route });
  if (ssr && !mod.prerender) {
    return { staticPaths: Object.assign([], { keyed: /* @__PURE__ */ new Map() }) };
  }
  if (!mod.getStaticPaths) {
    throw new Error("Unexpected Error.");
  }
  let staticPaths = [];
  staticPaths = await mod.getStaticPaths({
    paginate: generatePaginateFunction(route),
    rss() {
      throw new AstroError(AstroErrorData.GetStaticPathsRemovedRSSHelper);
    }
  });
  if (Array.isArray(staticPaths)) {
    staticPaths = staticPaths.flat();
  }
  if (isValidate) {
    validateGetStaticPathsResult(staticPaths, logging, route);
  }
  const keyedStaticPaths = staticPaths;
  keyedStaticPaths.keyed = /* @__PURE__ */ new Map();
  for (const sp of keyedStaticPaths) {
    const paramsKey = stringifyParams(sp.params, route.component);
    keyedStaticPaths.keyed.set(paramsKey, sp);
  }
  return {
    staticPaths: keyedStaticPaths
  };
}
function findPathItemByKey(staticPaths, params, route) {
  const paramsKey = stringifyParams(params, route.component);
  const matchedStaticPath = staticPaths.keyed.get(paramsKey);
  if (matchedStaticPath) {
    return matchedStaticPath;
  }
  debug("findPathItemByKey", `Unexpected cache miss looking for ${paramsKey}`);
}
async function getParamsAndProps(opts) {
  const { logging, mod, route, routeCache, pathname, ssr } = opts;
  let params = {};
  let pageProps;
  if (route && !route.pathname) {
    if (route.params.length) {
      const paramsMatch = route.pattern.exec(pathname);
      if (paramsMatch) {
        params = getParams(route.params)(paramsMatch);
      }
    }
    let routeCacheEntry = routeCache.get(route);
    if (!routeCacheEntry) {
      routeCacheEntry = await callGetStaticPaths({ mod, route, isValidate: true, logging, ssr });
      routeCache.set(route, routeCacheEntry);
    }
    const matchedStaticPath = findPathItemByKey(routeCacheEntry.staticPaths, params, route);
    if (!matchedStaticPath && (ssr ? mod.prerender : true)) {
      return 0;
    }
    pageProps = (matchedStaticPath == null ? void 0 : matchedStaticPath.props) ? { ...matchedStaticPath.props } : {};
  } else {
    pageProps = {};
  }
  return [params, pageProps];
}
async function renderPage(mod, ctx, env) {
  var _a2, _b;
  const paramsAndPropsRes = await getParamsAndProps({
    logging: env.logging,
    mod,
    route: ctx.route,
    routeCache: env.routeCache,
    pathname: ctx.pathname,
    ssr: env.ssr
  });
  if (paramsAndPropsRes === 0) {
    throw new AstroError({
      ...AstroErrorData.NoMatchingStaticPathFound,
      message: AstroErrorData.NoMatchingStaticPathFound.message(ctx.pathname),
      hint: ((_a2 = ctx.route) == null ? void 0 : _a2.component) ? AstroErrorData.NoMatchingStaticPathFound.hint([(_b = ctx.route) == null ? void 0 : _b.component]) : ""
    });
  }
  const [params, pageProps] = paramsAndPropsRes;
  const Component = mod.default;
  if (!Component)
    throw new Error(`Expected an exported Astro component but received typeof ${typeof Component}`);
  const result = createResult({
    adapterName: env.adapterName,
    links: ctx.links,
    styles: ctx.styles,
    logging: env.logging,
    markdown: env.markdown,
    mode: env.mode,
    origin: ctx.origin,
    params,
    props: pageProps,
    pathname: ctx.pathname,
    propagation: ctx.propagation,
    resolve: env.resolve,
    renderers: env.renderers,
    request: ctx.request,
    site: env.site,
    scripts: ctx.scripts,
    ssr: env.ssr,
    status: ctx.status ?? 200
  });
  if (typeof mod.components === "object") {
    Object.assign(pageProps, { components: mod.components });
  }
  const response = await renderPage$1(
    result,
    Component,
    pageProps,
    null,
    env.streaming,
    ctx.route
  );
  if (result.cookies) {
    attachToResponse(response, result.cookies);
  }
  return response;
}
function createAPIContext({
  request,
  params,
  site,
  props,
  adapterName
}) {
  return {
    cookies: new AstroCookies(request),
    request,
    params,
    site: site ? new URL(site) : void 0,
    generator: `Astro v${ASTRO_VERSION}`,
    props,
    redirect(path, status) {
      return new Response(null, {
        status: status || 302,
        headers: {
          Location: path
        }
      });
    },
    url: new URL(request.url),
    get clientAddress() {
      if (!(clientAddressSymbol in request)) {
        if (adapterName) {
          throw new AstroError({
            ...AstroErrorData.ClientAddressNotAvailable,
            message: AstroErrorData.ClientAddressNotAvailable.message(adapterName)
          });
        } else {
          throw new AstroError(AstroErrorData.StaticClientAddressNotAvailable);
        }
      }
      return Reflect.get(request, clientAddressSymbol);
    }
  };
}
async function call(mod, env, ctx) {
  var _a2, _b;
  const paramsAndPropsResp = await getParamsAndProps({
    mod,
    route: ctx.route,
    routeCache: env.routeCache,
    pathname: ctx.pathname,
    logging: env.logging,
    ssr: env.ssr
  });
  if (paramsAndPropsResp === GetParamsAndPropsError.NoMatchingStaticPath) {
    throw new AstroError({
      ...AstroErrorData.NoMatchingStaticPathFound,
      message: AstroErrorData.NoMatchingStaticPathFound.message(ctx.pathname),
      hint: ((_a2 = ctx.route) == null ? void 0 : _a2.component) ? AstroErrorData.NoMatchingStaticPathFound.hint([(_b = ctx.route) == null ? void 0 : _b.component]) : ""
    });
  }
  const [params, props] = paramsAndPropsResp;
  const context = createAPIContext({
    request: ctx.request,
    params,
    props,
    site: env.site,
    adapterName: env.adapterName
  });
  const response = await renderEndpoint(mod, context, env.ssr);
  if (response instanceof Response) {
    attachToResponse(response, context.cookies);
    return {
      type: "response",
      response
    };
  }
  return {
    type: "simple",
    body: response.body,
    encoding: response.encoding,
    cookies: context.cookies
  };
}
function appendForwardSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}
function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function removeLeadingForwardSlash(path) {
  return path.startsWith("/") ? path.substring(1) : path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function isString(path) {
  return typeof path === "string" || path instanceof String;
}
function joinPaths(...paths) {
  return paths.filter(isString).map(trimSlashes).join("/");
}
function createRenderContext(options) {
  const request = options.request;
  const url6 = new URL(request.url);
  const origin = options.origin ?? url6.origin;
  const pathname = options.pathname ?? url6.pathname;
  return {
    ...options,
    origin,
    pathname,
    url: url6
  };
}
function createEnvironment(options) {
  return options;
}
function slash(path) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path);
  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }
  return path.replace(/\\/g, "/");
}
function getRootPath(base) {
  return appendForwardSlash(new URL(base || "/", "http://localhost/").pathname);
}
function joinToRoot(href, base) {
  const rootPath = getRootPath(base);
  const normalizedHref = slash(href);
  return appendForwardSlash(rootPath) + removeLeadingForwardSlash(normalizedHref);
}
function createLinkStylesheetElement(href, base) {
  return {
    props: {
      rel: "stylesheet",
      href: joinToRoot(href, base)
    },
    children: ""
  };
}
function createLinkStylesheetElementSet(hrefs, base) {
  return new Set(hrefs.map((href) => createLinkStylesheetElement(href, base)));
}
function createModuleScriptElement(script, base) {
  if (script.type === "external") {
    return createModuleScriptElementWithSrc(script.value, base);
  } else {
    return {
      props: {
        type: "module"
      },
      children: script.value
    };
  }
}
function createModuleScriptElementWithSrc(src, site) {
  return {
    props: {
      type: "module",
      src: joinToRoot(src, site)
    },
    children: ""
  };
}
function matchRoute(pathname, manifest) {
  return manifest.routes.find((route) => route.pattern.test(decodeURI(pathname)));
}
function matchAssets(route, assets) {
  for (const asset of assets) {
    if (!asset.endsWith(".html"))
      continue;
    if (route.pattern.test(asset)) {
      return asset;
    }
    if (route.pattern.test(asset.replace(/index\.html$/, ""))) {
      return asset;
    }
  }
}
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a2 = options.prefixes, prefixes = _a2 === void 0 ? "./" : _a2;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a3 = tokens[i], nextType = _a3.type, index = _a3.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a2 = options.encode, encode2 = _a2 === void 0 ? function(x) {
    return x;
  } : _a2, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data6) {
    var path = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path += token;
        continue;
      }
      var value = data6 ? data6[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode2(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode2(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path;
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}
function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}
function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const propagation = new Map(serializedManifest.propagation);
  return {
    ...serializedManifest,
    assets,
    propagation,
    routes
  };
}
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html4 = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html: html4 };
}
function createCollectionToGlobResultMap({
  globResult,
  contentDir: contentDir2
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir2}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection6 = segments[0];
    const entryId = segments.slice(1).join("/");
    collectionToGlobResultMap[collection6] ?? (collectionToGlobResultMap[collection6] = {});
    collectionToGlobResultMap[collection6][entryId] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  collectionToEntryMap: collectionToEntryMap2,
  collectionToRenderEntryMap: collectionToRenderEntryMap2
}) {
  return async function getCollection2(collection6, filter) {
    const lazyImports = Object.values(collectionToEntryMap2[collection6] ?? {});
    const entries = Promise.all(
      lazyImports.map(async (lazyImport) => {
        const entry = await lazyImport();
        return {
          id: entry.id,
          slug: entry.slug,
          body: entry.body,
          collection: entry.collection,
          data: entry.data,
          async render() {
            return render({
              collection: entry.collection,
              id: entry.id,
              collectionToRenderEntryMap: collectionToRenderEntryMap2
            });
          }
        };
      })
    );
    if (typeof filter === "function") {
      return (await entries).filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection: collection6,
  id: id6,
  collectionToRenderEntryMap: collectionToRenderEntryMap2
}) {
  var _a2;
  const UnexpectedRenderError = new AstroError({
    ...AstroErrorData.UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection6)} \u2192 ${String(id6)}.`
  });
  const lazyImport = (_a2 = collectionToRenderEntryMap2[collection6]) == null ? void 0 : _a2[id6];
  if (typeof lazyImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await lazyImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { collectedStyles: collectedStyles6, collectedLinks: collectedLinks6, collectedScripts: collectedScripts6, getMod: getMod6 } = baseMod;
  if (typeof getMod6 !== "function")
    throw UnexpectedRenderError;
  const mod = await getMod6();
  if (mod == null || typeof mod !== "object")
    throw UnexpectedRenderError;
  const Content6 = createComponent({
    factory(result, baseProps, slots) {
      let styles = "", links = "", scripts = "";
      if (Array.isArray(collectedStyles6)) {
        styles = collectedStyles6.map((style) => renderStyleElement(style)).join("");
      }
      if (Array.isArray(collectedLinks6)) {
        links = collectedLinks6.map((link) => {
          return renderUniqueStylesheet(result, {
            href: prependForwardSlash(link)
          });
        }).join("");
      }
      if (Array.isArray(collectedScripts6)) {
        scripts = collectedScripts6.map((script) => renderScriptElement(script)).join("");
      }
      let props = baseProps;
      if (id6.endsWith("mdx")) {
        props = {
          components: mod.components ?? {},
          ...baseProps
        };
      }
      return createHeadAndContent(
        unescapeHTML(styles + links + scripts),
        renderTemplate`${renderComponent(
          createScopedResult(result),
          "Content",
          mod.Content,
          props,
          slots
        )}`
      );
    },
    propagation: "self"
  });
  return {
    Content: Content6,
    headings: mod.getHeadings(),
    remarkPluginFrontmatter: mod.frontmatter
  };
}
var Mime_1, standard, other, Mime, mime, parse_1, serialize_1, __toString, fieldContentRegExp, __accessCheck$3, __privateGet$3, __privateAdd$3, __privateSet$3, __privateMethod$1, _request, _requestValues, _outgoing, _ensureParsed, ensureParsed_fn, _ensureOutgoingMap, ensureOutgoingMap_fn, _parse, parse_fn, DELETED_EXPIRATION, DELETED_VALUE, AstroCookie, AstroCookies, astroCookiesSymbol, defineErrors, AstroErrorData, AstroError, ASTRO_VERSION, replace, ca, esca, pe, escape, escapeHTML, HTMLBytes, HTMLString, markHTMLString, AstroJSX, Empty, toSlotName, idle_prebuilt_default, load_prebuilt_default, media_prebuilt_default, only_prebuilt_default, visible_prebuilt_default, astro_island_prebuilt_default, hydrationScripts, voidElementNames, htmlBooleanAttributes, htmlEnumAttributes, svgEnumAttributes, STATIC_DIRECTIVES, toIdent, toAttributeString, kebab, toStyleString, uniqueElements, ScopeFlags, headAndContentSym, _a$1, renderTemplateResultSym, RenderTemplateResult, PROP_TYPE, HydrationDirectivesRaw, HydrationDirectives, HydrationDirectiveProps, _a, astroComponentInstanceSym, AstroComponentInstance, slotString, SlotString, Fragment, Renderer, encoder, decoder, HTMLParts, ClientOnlyPlaceholder, Skip, originalConsoleError, consoleFilterRefs, dictionary, binary, rendererAliases, __accessCheck$2, __privateGet$2, __privateAdd$2, __privateSet$2, isNodeJS, StreamingCompatibleResponse, createResponse, needsHeadRenderingSymbol, stylesheetRel, FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY, $, reset, bold, dim, red, yellow, cyan, eastasianwidthExports, eastasianwidth, dateTimeFormat, levels, VALID_PARAM_TYPES, __accessCheck$1, __privateGet$1, __privateAdd$1, __privateSet$1, _result, _slots, _loggingOpts, clientAddressSymbol$1, Slots, renderMarkdown, RouteCache, GetParamsAndPropsError, clientAddressSymbol, lastMessage, lastMessageCount, consoleLogDestination, __accessCheck, __privateGet, __privateAdd, __privateSet, __privateMethod, _env, _manifest, _manifestData, _routeDataToRouteInfo, _encoder, _logging, _base, _baseWithoutTrailingSlash, _renderPage, renderPage_fn, _callEndpoint, callEndpoint_fn, App, slotName, server_default;
var init_astro_1790c127 = __esm({
  "dist/server/chunks/astro.1790c127.mjs"() {
    "use strict";
    Mime$1.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext] = type;
        }
        if (force || !this._extensions[type]) {
          const ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime$1.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime$1.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    Mime_1 = Mime$1;
    standard = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
    other = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
    Mime = Mime_1;
    mime = new Mime(standard, other);
    parse_1 = parse$1;
    serialize_1 = serialize;
    __toString = Object.prototype.toString;
    fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    __accessCheck$3 = (obj, member, msg) => {
      if (!member.has(obj))
        throw TypeError("Cannot " + msg);
    };
    __privateGet$3 = (obj, member, getter) => {
      __accessCheck$3(obj, member, "read from private field");
      return getter ? getter.call(obj) : member.get(obj);
    };
    __privateAdd$3 = (obj, member, value) => {
      if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
      member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    };
    __privateSet$3 = (obj, member, value, setter) => {
      __accessCheck$3(obj, member, "write to private field");
      setter ? setter.call(obj, value) : member.set(obj, value);
      return value;
    };
    __privateMethod$1 = (obj, member, method) => {
      __accessCheck$3(obj, member, "access private method");
      return method;
    };
    DELETED_EXPIRATION = new Date(0);
    DELETED_VALUE = "deleted";
    AstroCookie = class {
      constructor(value) {
        this.value = value;
      }
      json() {
        if (this.value === void 0) {
          throw new Error(`Cannot convert undefined to an object.`);
        }
        return JSON.parse(this.value);
      }
      number() {
        return Number(this.value);
      }
      boolean() {
        if (this.value === "false")
          return false;
        if (this.value === "0")
          return false;
        return Boolean(this.value);
      }
    };
    AstroCookies = class {
      constructor(request) {
        __privateAdd$3(this, _ensureParsed);
        __privateAdd$3(this, _ensureOutgoingMap);
        __privateAdd$3(this, _parse);
        __privateAdd$3(this, _request, void 0);
        __privateAdd$3(this, _requestValues, void 0);
        __privateAdd$3(this, _outgoing, void 0);
        __privateSet$3(this, _request, request);
        __privateSet$3(this, _requestValues, null);
        __privateSet$3(this, _outgoing, null);
      }
      delete(key, options) {
        const serializeOptions = {
          expires: DELETED_EXPIRATION
        };
        if (options == null ? void 0 : options.domain) {
          serializeOptions.domain = options.domain;
        }
        if (options == null ? void 0 : options.path) {
          serializeOptions.path = options.path;
        }
        __privateMethod$1(this, _ensureOutgoingMap, ensureOutgoingMap_fn).call(this).set(key, [
          DELETED_VALUE,
          serialize_1(key, DELETED_VALUE, serializeOptions),
          false
        ]);
      }
      get(key) {
        if (__privateGet$3(this, _outgoing) !== null && __privateGet$3(this, _outgoing).has(key)) {
          let [serializedValue, , isSetValue] = __privateGet$3(this, _outgoing).get(key);
          if (isSetValue) {
            return new AstroCookie(serializedValue);
          } else {
            return new AstroCookie(void 0);
          }
        }
        const values = __privateMethod$1(this, _ensureParsed, ensureParsed_fn).call(this);
        const value = values[key];
        return new AstroCookie(value);
      }
      has(key) {
        if (__privateGet$3(this, _outgoing) !== null && __privateGet$3(this, _outgoing).has(key)) {
          let [, , isSetValue] = __privateGet$3(this, _outgoing).get(key);
          return isSetValue;
        }
        const values = __privateMethod$1(this, _ensureParsed, ensureParsed_fn).call(this);
        return !!values[key];
      }
      set(key, value, options) {
        let serializedValue;
        if (typeof value === "string") {
          serializedValue = value;
        } else {
          let toStringValue = value.toString();
          if (toStringValue === Object.prototype.toString.call(value)) {
            serializedValue = JSON.stringify(value);
          } else {
            serializedValue = toStringValue;
          }
        }
        const serializeOptions = {};
        if (options) {
          Object.assign(serializeOptions, options);
        }
        __privateMethod$1(this, _ensureOutgoingMap, ensureOutgoingMap_fn).call(this).set(key, [
          serializedValue,
          serialize_1(key, serializedValue, serializeOptions),
          true
        ]);
      }
      *headers() {
        if (__privateGet$3(this, _outgoing) == null)
          return;
        for (const [, value] of __privateGet$3(this, _outgoing)) {
          yield value[1];
        }
      }
    };
    _request = /* @__PURE__ */ new WeakMap();
    _requestValues = /* @__PURE__ */ new WeakMap();
    _outgoing = /* @__PURE__ */ new WeakMap();
    _ensureParsed = /* @__PURE__ */ new WeakSet();
    ensureParsed_fn = function() {
      if (!__privateGet$3(this, _requestValues)) {
        __privateMethod$1(this, _parse, parse_fn).call(this);
      }
      if (!__privateGet$3(this, _requestValues)) {
        __privateSet$3(this, _requestValues, {});
      }
      return __privateGet$3(this, _requestValues);
    };
    _ensureOutgoingMap = /* @__PURE__ */ new WeakSet();
    ensureOutgoingMap_fn = function() {
      if (!__privateGet$3(this, _outgoing)) {
        __privateSet$3(this, _outgoing, /* @__PURE__ */ new Map());
      }
      return __privateGet$3(this, _outgoing);
    };
    _parse = /* @__PURE__ */ new WeakSet();
    parse_fn = function() {
      const raw = __privateGet$3(this, _request).headers.get("cookie");
      if (!raw) {
        return;
      }
      __privateSet$3(this, _requestValues, parse_1(raw));
    };
    astroCookiesSymbol = Symbol.for("astro.cookies");
    defineErrors = (errs) => errs;
    AstroErrorData = defineErrors({
      UnknownCompilerError: {
        title: "Unknown compiler error.",
        code: 1e3,
        hint: "This is almost always a problem with the Astro compiler, not your code. Please open an issue at https://astro.build/issues/compiler."
      },
      StaticRedirectNotAvailable: {
        title: "`Astro.redirect` is not available in static mode.",
        code: 3001,
        message: "Redirects are only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
        hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
      },
      ClientAddressNotAvailable: {
        title: "`Astro.clientAddress` is not available in current adapter.",
        code: 3002,
        message: (adapterName) => `\`Astro.clientAddress\` is not available in the \`${adapterName}\` adapter. File an issue with the adapter to add support.`
      },
      StaticClientAddressNotAvailable: {
        title: "`Astro.clientAddress` is not available in static mode.",
        code: 3003,
        message: "`Astro.clientAddress` is only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
        hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
      },
      NoMatchingStaticPathFound: {
        title: "No static path found for requested path.",
        code: 3004,
        message: (pathName) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${pathName}\`.`,
        hint: (possibleRoutes) => `Possible dynamic routes being matched: ${possibleRoutes.join(", ")}.`
      },
      OnlyResponseCanBeReturned: {
        title: "Invalid type returned by Astro page.",
        code: 3005,
        message: (route, returnedValue) => `Route \`${route ? route : ""}\` returned a \`${returnedValue}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
        hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information."
      },
      MissingMediaQueryDirective: {
        title: "Missing value for `client:media` directive.",
        code: 3006,
        message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'
      },
      NoMatchingRenderer: {
        title: "No matching renderer found.",
        code: 3007,
        message: (componentName, componentExtension, plural, validRenderersCount) => `Unable to render \`${componentName}\`.

${validRenderersCount > 0 ? `There ${plural ? "are." : "is."} ${validRenderersCount} renderer${plural ? "s." : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were." : "it was not."} able to server-side render \`${componentName}\`.` : `No valid renderer was found ${componentExtension ? `for the \`.${componentExtension}\` file extension.` : `for this file extension.`}`}`,
        hint: (probableRenderers) => `Did you mean to enable the ${probableRenderers} integration?

See https://docs.astro.build/en/core-concepts/framework-components/ for more information on how to install and configure integrations.`
      },
      NoClientEntrypoint: {
        title: "No client entrypoint specified in renderer.",
        code: 3008,
        message: (componentName, clientDirective, rendererName) => `\`${componentName}\` component has a \`client:${clientDirective}\` directive, but no client entrypoint was provided by \`${rendererName}\`.`,
        hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer."
      },
      NoClientOnlyHint: {
        title: "Missing hint on client:only directive.",
        code: 3009,
        message: (componentName) => `Unable to render \`${componentName}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
        hint: (probableRenderers) => `Did you mean to pass \`client:only="${probableRenderers}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`
      },
      InvalidGetStaticPathParam: {
        title: "Invalid value returned by a `getStaticPaths` path.",
        code: 3010,
        message: (paramType) => `Invalid params given to \`getStaticPaths\` path. Expected an \`object\`, got \`${paramType}\``,
        hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
      },
      InvalidGetStaticPathsReturn: {
        title: "Invalid value returned by getStaticPaths.",
        code: 3011,
        message: (returnType) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${returnType}\``,
        hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
      },
      GetStaticPathsRemovedRSSHelper: {
        title: "getStaticPaths RSS helper is not available anymore.",
        code: 3012,
        message: "The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.",
        hint: "See https://docs.astro.build/en/guides/rss/ for more information."
      },
      GetStaticPathsExpectedParams: {
        title: "Missing params property on `getStaticPaths` route.",
        code: 3013,
        message: "Missing or empty required `params` property on `getStaticPaths` route.",
        hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
      },
      GetStaticPathsInvalidRouteParam: {
        title: "Invalid value for `getStaticPaths` route parameter.",
        code: 3014,
        message: (key, value, valueType) => `Invalid getStaticPaths route parameter for \`${key}\`. Expected undefined, a string or a number, received \`${valueType}\` (\`${value}\`)`,
        hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
      },
      GetStaticPathsRequired: {
        title: "`getStaticPaths()` function required for dynamic routes.",
        code: 3015,
        message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",
        hint: `See https://docs.astro.build/en/core-concepts/routing/#dynamic-routes for more information on dynamic routes.

Alternatively, set \`output: "server"\` in your Astro config file to switch to a non-static server build. This error can also occur if using \`export const prerender = true;\`.
See https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.`
      },
      ReservedSlotName: {
        title: "Invalid slot name.",
        code: 3016,
        message: (slotName2) => `Unable to create a slot named \`${slotName2}\`. \`${slotName2}\` is a reserved slot name. Please update the name of this slot.`
      },
      NoAdapterInstalled: {
        title: "Cannot use Server-side Rendering without an adapter.",
        code: 3017,
        message: `Cannot use \`output: 'server'\` without an adapter. Please install and configure the appropriate server adapter for your final deployment.`,
        hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information."
      },
      NoMatchingImport: {
        title: "No import found for component.",
        code: 3018,
        message: (componentName) => `Could not render \`${componentName}\`. No matching import has been found for \`${componentName}\`.`,
        hint: "Please make sure the component is properly imported."
      },
      InvalidPrerenderExport: {
        title: "Invalid prerender export.",
        code: 3019,
        message: (prefix, suffix) => {
          let msg = `A \`prerender\` export has been detected, but its value cannot be statically analyzed.`;
          if (prefix !== "const")
            msg += `
Expected \`const\` declaration but got \`${prefix}\`.`;
          if (suffix !== "true")
            msg += `
Expected \`true\` value but got \`${suffix}\`.`;
          return msg;
        },
        hint: "Mutable values declared at runtime are not supported. Please make sure to use exactly `export const prerender = true`."
      },
      InvalidComponentArgs: {
        title: "Invalid component arguments.",
        code: 3020,
        message: (name) => `Invalid arguments passed to${name ? ` <${name}>` : ""} component.`,
        hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."
      },
      PageNumberParamNotFound: {
        title: "Page number param not found.",
        code: 3021,
        message: (paramName) => `[paginate()] page number param \`${paramName}\` not found in your filepath.`,
        hint: "Rename your file to `[page].astro` or `[...page].astro`."
      },
      UnknownViteError: {
        title: "Unknown Vite Error.",
        code: 4e3
      },
      FailedToLoadModuleSSR: {
        title: "Could not import file.",
        code: 4001,
        message: (importName) => `Could not import \`${importName}\`.`,
        hint: "This is often caused by a typo in the import path. Please make sure the file exists."
      },
      InvalidGlob: {
        title: "Invalid glob pattern.",
        code: 4002,
        message: (globPattern) => `Invalid glob pattern: \`${globPattern}\`. Glob patterns must start with './', '../' or '/'.`,
        hint: "See https://docs.astro.build/en/guides/imports/#glob-patterns for more information on supported glob patterns."
      },
      UnknownCSSError: {
        title: "Unknown CSS Error.",
        code: 5e3
      },
      CSSSyntaxError: {
        title: "CSS Syntax Error.",
        code: 5001
      },
      UnknownMarkdownError: {
        title: "Unknown Markdown Error.",
        code: 6e3
      },
      MarkdownFrontmatterParseError: {
        title: "Failed to parse Markdown frontmatter.",
        code: 6001
      },
      InvalidFrontmatterInjectionError: {
        title: "Invalid frontmatter injection.",
        code: 6003,
        message: 'A remark or rehype plugin attempted to inject invalid frontmatter. Ensure "astro.frontmatter" is set to a valid JSON object that is not `null` or `undefined`.',
        hint: "See the frontmatter injection docs https://docs.astro.build/en/guides/markdown-content/#modifying-frontmatter-programmatically for more information."
      },
      MdxIntegrationMissingError: {
        title: "MDX integration missing.",
        code: 6004,
        message: (file6) => `Unable to render ${file6}. Ensure that the \`@astrojs/mdx\` integration is installed.`,
        hint: "See the MDX integration docs for installation and usage instructions: https://docs.astro.build/en/guides/integrations-guide/mdx/"
      },
      UnknownConfigError: {
        title: "Unknown configuration error.",
        code: 7e3
      },
      ConfigNotFound: {
        title: "Specified configuration file not found.",
        code: 7001,
        message: (configFile) => `Unable to resolve \`--config "${configFile}"\`. Does the file exist?`
      },
      ConfigLegacyKey: {
        title: "Legacy configuration detected.",
        code: 7002,
        message: (legacyConfigKey) => `Legacy configuration detected: \`${legacyConfigKey}\`.`,
        hint: "Please update your configuration to the new format.\nSee https://astro.build/config for more information."
      },
      UnknownCLIError: {
        title: "Unknown CLI Error.",
        code: 8e3
      },
      GenerateContentTypesError: {
        title: "Failed to generate content types.",
        code: 8001,
        message: "`astro sync` command failed to generate content collection types.",
        hint: "Check your `src/content/config.*` file for typos."
      },
      UnknownContentCollectionError: {
        title: "Unknown Content Collection Error.",
        code: 9e3
      },
      InvalidContentEntryFrontmatterError: {
        title: "Content entry frontmatter does not match schema.",
        code: 9001,
        message: (collection6, entryId, error2) => {
          return [
            `${String(collection6)} \u2192 ${String(entryId)} frontmatter does not match collection schema.`,
            ...error2.errors.map((zodError) => zodError.message)
          ].join("\n");
        },
        hint: "See https://docs.astro.build/en/guides/content-collections/ for more information on content schemas."
      },
      InvalidContentEntrySlugError: {
        title: "Invalid content entry slug.",
        code: 9002,
        message: (collection6, entryId) => {
          return `${String(collection6)} \u2192 ${String(
            entryId
          )} has an invalid slug. \`slug\` must be a string.`;
        },
        hint: "See https://docs.astro.build/en/guides/content-collections/ for more on the `slug` field."
      },
      ContentSchemaContainsSlugError: {
        title: "Content Schema should not contain `slug`.",
        code: 9003,
        message: (collection6) => {
          return `A content collection schema should not contain \`slug\` since it is reserved for slug generation. Remove this from your ${collection6} collection schema.`;
        },
        hint: "See https://docs.astro.build/en/guides/content-collections/ for more on the `slug` field."
      },
      UnknownError: {
        title: "Unknown Error.",
        code: 99999
      }
    });
    AstroError = class extends Error {
      constructor(props, ...params) {
        var _a2;
        super(...params);
        this.type = "AstroError";
        const { code, name, title, message, stack, location, hint, frame } = props;
        this.errorCode = code;
        if (name && name !== "Error") {
          this.name = name;
        } else {
          this.name = ((_a2 = getErrorDataByCode(this.errorCode)) == null ? void 0 : _a2.name) ?? "UnknownError";
        }
        this.title = title;
        if (message)
          this.message = message;
        this.stack = stack ? stack : this.stack;
        this.loc = location;
        this.hint = hint;
        this.frame = frame;
      }
      setErrorCode(errorCode) {
        this.errorCode = errorCode;
      }
      setLocation(location) {
        this.loc = location;
      }
      setName(name) {
        this.name = name;
      }
      setMessage(message) {
        this.message = message;
      }
      setHint(hint) {
        this.hint = hint;
      }
      setFrame(source, location) {
        this.frame = codeFrame(source, location);
      }
      static is(err) {
        return err.type === "AstroError";
      }
    };
    ASTRO_VERSION = "2.0.14";
    ({ replace } = "");
    ca = /[&<>'"]/g;
    esca = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    };
    pe = (m) => esca[m];
    escape = (es) => replace.call(es, ca, pe);
    escapeHTML = escape;
    HTMLBytes = class extends Uint8Array {
    };
    Object.defineProperty(HTMLBytes.prototype, Symbol.toStringTag, {
      get() {
        return "HTMLBytes";
      }
    });
    HTMLString = class extends String {
      get [Symbol.toStringTag]() {
        return "HTMLString";
      }
    };
    markHTMLString = (value) => {
      if (value instanceof HTMLString) {
        return value;
      }
      if (typeof value === "string") {
        return new HTMLString(value);
      }
      return value;
    };
    AstroJSX = "astro:jsx";
    Empty = Symbol("empty");
    toSlotName = (slotAttr) => slotAttr;
    idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;
    load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;
    media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;
    only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;
    visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;
    astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;
    hydrationScripts = {
      idle: idle_prebuilt_default,
      load: load_prebuilt_default,
      only: only_prebuilt_default,
      media: media_prebuilt_default,
      visible: visible_prebuilt_default
    };
    voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
    htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
    htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
    svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
    STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
    toIdent = (k) => k.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
      if (/[^\w]|\s/.test(match))
        return "";
      return index === 0 ? match : match.toUpperCase();
    });
    toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
    kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    toStyleString = (obj) => Object.entries(obj).map(([k, v]) => {
      if (k[0] !== "-" && k[1] !== "-")
        return `${kebab(k)}:${v}`;
      if (kebab(k) !== k)
        return `${kebab(k)}:var(${k});${k}:${v}`;
      return `${k}:${v}`;
    }).join(";");
    uniqueElements = (item, index, all) => {
      const props = JSON.stringify(item.props);
      const children = item.children;
      return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
    };
    ScopeFlags = {
      Astro: 1 << 0,
      JSX: 1 << 1,
      Slot: 1 << 2,
      HeadBuffer: 1 << 3,
      RenderSlot: 1 << 4
    };
    headAndContentSym = Symbol.for("astro.headAndContent");
    renderTemplateResultSym = Symbol.for("astro.renderTemplateResult");
    RenderTemplateResult = class {
      constructor(htmlParts, expressions) {
        this[_a$1] = true;
        this.htmlParts = htmlParts;
        this.error = void 0;
        this.expressions = expressions.map((expression) => {
          if (isPromise(expression)) {
            return Promise.resolve(expression).catch((err) => {
              if (!this.error) {
                this.error = err;
                throw err;
              }
            });
          }
          return expression;
        });
      }
      async *[(_a$1 = renderTemplateResultSym, Symbol.asyncIterator)]() {
        const { htmlParts, expressions } = this;
        for (let i = 0; i < htmlParts.length; i++) {
          const html4 = htmlParts[i];
          const expression = expressions[i];
          yield markHTMLString(html4);
          yield* renderChild(expression);
        }
      }
    };
    PROP_TYPE = {
      Value: 0,
      JSON: 1,
      RegExp: 2,
      Date: 3,
      Map: 4,
      Set: 5,
      BigInt: 6,
      URL: 7,
      Uint8Array: 8,
      Uint16Array: 9,
      Uint32Array: 10
    };
    HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
    HydrationDirectives = new Set(HydrationDirectivesRaw);
    HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
    astroComponentInstanceSym = Symbol.for("astro.componentInstance");
    AstroComponentInstance = class {
      constructor(result, props, slots, factory) {
        this[_a] = true;
        this.result = result;
        this.props = props;
        this.factory = factory;
        this.slotValues = {};
        const scoped = createScopedResult(result, ScopeFlags.Slot);
        for (const name in slots) {
          const value = slots[name](scoped);
          this.slotValues[name] = () => value;
        }
      }
      async init(result) {
        this.returnValue = this.factory(result, this.props, this.slotValues);
        return this.returnValue;
      }
      async *render() {
        if (this.returnValue === void 0) {
          await this.init(this.result);
        }
        let value = this.returnValue;
        if (isPromise(value)) {
          value = await value;
        }
        if (isHeadAndContent(value)) {
          yield* value.content;
        } else {
          yield* renderChild(value);
        }
      }
    };
    _a = astroComponentInstanceSym;
    slotString = Symbol.for("astro:slot-string");
    SlotString = class extends HTMLString {
      constructor(content, instructions) {
        super(content);
        this.instructions = instructions;
        this[slotString] = true;
      }
    };
    Fragment = Symbol.for("astro:fragment");
    Renderer = Symbol.for("astro:renderer");
    encoder = new TextEncoder();
    decoder = new TextDecoder();
    HTMLParts = class {
      constructor() {
        this.parts = "";
      }
      append(part, result) {
        if (ArrayBuffer.isView(part)) {
          this.parts += decoder.decode(part);
        } else {
          this.parts += stringifyChunk(result, part);
        }
      }
      toString() {
        return this.parts;
      }
      toArrayBuffer() {
        return encoder.encode(this.parts);
      }
    };
    ClientOnlyPlaceholder = "astro-client-only";
    Skip = class {
      constructor(vnode) {
        this.vnode = vnode;
        this.count = 0;
      }
      increment() {
        this.count++;
      }
      haveNoTried() {
        return this.count === 0;
      }
      isCompleted() {
        return this.count > 2;
      }
    };
    Skip.symbol = Symbol("astro:jsx:skip");
    consoleFilterRefs = 0;
    dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
    binary = dictionary.length;
    rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
    __accessCheck$2 = (obj, member, msg) => {
      if (!member.has(obj))
        throw TypeError("Cannot " + msg);
    };
    __privateGet$2 = (obj, member, getter) => {
      __accessCheck$2(obj, member, "read from private field");
      return getter ? getter.call(obj) : member.get(obj);
    };
    __privateAdd$2 = (obj, member, value) => {
      if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
      member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    };
    __privateSet$2 = (obj, member, value, setter) => {
      __accessCheck$2(obj, member, "write to private field");
      setter ? setter.call(obj, value) : member.set(obj, value);
      return value;
    };
    isNodeJS = typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";
    createResponse = isNodeJS ? (body6, init2) => {
      if (typeof body6 === "string" || ArrayBuffer.isView(body6)) {
        return new Response(body6, init2);
      }
      if (typeof StreamingCompatibleResponse === "undefined") {
        return new (createResponseClass())(body6, init2);
      }
      return new StreamingCompatibleResponse(body6, init2);
    } : (body6, init2) => new Response(body6, init2);
    needsHeadRenderingSymbol = Symbol.for("astro.needsHeadRendering");
    stylesheetRel = "stylesheet";
    isTTY = true;
    if (typeof process !== "undefined") {
      ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
      isTTY = process.stdout && process.stdout.isTTY;
    }
    $ = {
      enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
    };
    reset = init(0, 0);
    bold = init(1, 22);
    dim = init(2, 22);
    red = init(31, 39);
    yellow = init(33, 39);
    cyan = init(36, 39);
    eastasianwidthExports = {};
    eastasianwidth = {
      get exports() {
        return eastasianwidthExports;
      },
      set exports(v) {
        eastasianwidthExports = v;
      }
    };
    (function(module) {
      var eaw = {};
      {
        module.exports = eaw;
      }
      eaw.eastAsianWidth = function(character) {
        var x = character.charCodeAt(0);
        var y = character.length == 2 ? character.charCodeAt(1) : 0;
        var codePoint = x;
        if (55296 <= x && x <= 56319 && (56320 <= y && y <= 57343)) {
          x &= 1023;
          y &= 1023;
          codePoint = x << 10 | y;
          codePoint += 65536;
        }
        if (12288 == codePoint || 65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510) {
          return "F";
        }
        if (8361 == codePoint || 65377 <= codePoint && codePoint <= 65470 || 65474 <= codePoint && codePoint <= 65479 || 65482 <= codePoint && codePoint <= 65487 || 65490 <= codePoint && codePoint <= 65495 || 65498 <= codePoint && codePoint <= 65500 || 65512 <= codePoint && codePoint <= 65518) {
          return "H";
        }
        if (4352 <= codePoint && codePoint <= 4447 || 4515 <= codePoint && codePoint <= 4519 || 4602 <= codePoint && codePoint <= 4607 || 9001 <= codePoint && codePoint <= 9002 || 11904 <= codePoint && codePoint <= 11929 || 11931 <= codePoint && codePoint <= 12019 || 12032 <= codePoint && codePoint <= 12245 || 12272 <= codePoint && codePoint <= 12283 || 12289 <= codePoint && codePoint <= 12350 || 12353 <= codePoint && codePoint <= 12438 || 12441 <= codePoint && codePoint <= 12543 || 12549 <= codePoint && codePoint <= 12589 || 12593 <= codePoint && codePoint <= 12686 || 12688 <= codePoint && codePoint <= 12730 || 12736 <= codePoint && codePoint <= 12771 || 12784 <= codePoint && codePoint <= 12830 || 12832 <= codePoint && codePoint <= 12871 || 12880 <= codePoint && codePoint <= 13054 || 13056 <= codePoint && codePoint <= 19903 || 19968 <= codePoint && codePoint <= 42124 || 42128 <= codePoint && codePoint <= 42182 || 43360 <= codePoint && codePoint <= 43388 || 44032 <= codePoint && codePoint <= 55203 || 55216 <= codePoint && codePoint <= 55238 || 55243 <= codePoint && codePoint <= 55291 || 63744 <= codePoint && codePoint <= 64255 || 65040 <= codePoint && codePoint <= 65049 || 65072 <= codePoint && codePoint <= 65106 || 65108 <= codePoint && codePoint <= 65126 || 65128 <= codePoint && codePoint <= 65131 || 110592 <= codePoint && codePoint <= 110593 || 127488 <= codePoint && codePoint <= 127490 || 127504 <= codePoint && codePoint <= 127546 || 127552 <= codePoint && codePoint <= 127560 || 127568 <= codePoint && codePoint <= 127569 || 131072 <= codePoint && codePoint <= 194367 || 177984 <= codePoint && codePoint <= 196605 || 196608 <= codePoint && codePoint <= 262141) {
          return "W";
        }
        if (32 <= codePoint && codePoint <= 126 || 162 <= codePoint && codePoint <= 163 || 165 <= codePoint && codePoint <= 166 || 172 == codePoint || 175 == codePoint || 10214 <= codePoint && codePoint <= 10221 || 10629 <= codePoint && codePoint <= 10630) {
          return "Na";
        }
        if (161 == codePoint || 164 == codePoint || 167 <= codePoint && codePoint <= 168 || 170 == codePoint || 173 <= codePoint && codePoint <= 174 || 176 <= codePoint && codePoint <= 180 || 182 <= codePoint && codePoint <= 186 || 188 <= codePoint && codePoint <= 191 || 198 == codePoint || 208 == codePoint || 215 <= codePoint && codePoint <= 216 || 222 <= codePoint && codePoint <= 225 || 230 == codePoint || 232 <= codePoint && codePoint <= 234 || 236 <= codePoint && codePoint <= 237 || 240 == codePoint || 242 <= codePoint && codePoint <= 243 || 247 <= codePoint && codePoint <= 250 || 252 == codePoint || 254 == codePoint || 257 == codePoint || 273 == codePoint || 275 == codePoint || 283 == codePoint || 294 <= codePoint && codePoint <= 295 || 299 == codePoint || 305 <= codePoint && codePoint <= 307 || 312 == codePoint || 319 <= codePoint && codePoint <= 322 || 324 == codePoint || 328 <= codePoint && codePoint <= 331 || 333 == codePoint || 338 <= codePoint && codePoint <= 339 || 358 <= codePoint && codePoint <= 359 || 363 == codePoint || 462 == codePoint || 464 == codePoint || 466 == codePoint || 468 == codePoint || 470 == codePoint || 472 == codePoint || 474 == codePoint || 476 == codePoint || 593 == codePoint || 609 == codePoint || 708 == codePoint || 711 == codePoint || 713 <= codePoint && codePoint <= 715 || 717 == codePoint || 720 == codePoint || 728 <= codePoint && codePoint <= 731 || 733 == codePoint || 735 == codePoint || 768 <= codePoint && codePoint <= 879 || 913 <= codePoint && codePoint <= 929 || 931 <= codePoint && codePoint <= 937 || 945 <= codePoint && codePoint <= 961 || 963 <= codePoint && codePoint <= 969 || 1025 == codePoint || 1040 <= codePoint && codePoint <= 1103 || 1105 == codePoint || 8208 == codePoint || 8211 <= codePoint && codePoint <= 8214 || 8216 <= codePoint && codePoint <= 8217 || 8220 <= codePoint && codePoint <= 8221 || 8224 <= codePoint && codePoint <= 8226 || 8228 <= codePoint && codePoint <= 8231 || 8240 == codePoint || 8242 <= codePoint && codePoint <= 8243 || 8245 == codePoint || 8251 == codePoint || 8254 == codePoint || 8308 == codePoint || 8319 == codePoint || 8321 <= codePoint && codePoint <= 8324 || 8364 == codePoint || 8451 == codePoint || 8453 == codePoint || 8457 == codePoint || 8467 == codePoint || 8470 == codePoint || 8481 <= codePoint && codePoint <= 8482 || 8486 == codePoint || 8491 == codePoint || 8531 <= codePoint && codePoint <= 8532 || 8539 <= codePoint && codePoint <= 8542 || 8544 <= codePoint && codePoint <= 8555 || 8560 <= codePoint && codePoint <= 8569 || 8585 == codePoint || 8592 <= codePoint && codePoint <= 8601 || 8632 <= codePoint && codePoint <= 8633 || 8658 == codePoint || 8660 == codePoint || 8679 == codePoint || 8704 == codePoint || 8706 <= codePoint && codePoint <= 8707 || 8711 <= codePoint && codePoint <= 8712 || 8715 == codePoint || 8719 == codePoint || 8721 == codePoint || 8725 == codePoint || 8730 == codePoint || 8733 <= codePoint && codePoint <= 8736 || 8739 == codePoint || 8741 == codePoint || 8743 <= codePoint && codePoint <= 8748 || 8750 == codePoint || 8756 <= codePoint && codePoint <= 8759 || 8764 <= codePoint && codePoint <= 8765 || 8776 == codePoint || 8780 == codePoint || 8786 == codePoint || 8800 <= codePoint && codePoint <= 8801 || 8804 <= codePoint && codePoint <= 8807 || 8810 <= codePoint && codePoint <= 8811 || 8814 <= codePoint && codePoint <= 8815 || 8834 <= codePoint && codePoint <= 8835 || 8838 <= codePoint && codePoint <= 8839 || 8853 == codePoint || 8857 == codePoint || 8869 == codePoint || 8895 == codePoint || 8978 == codePoint || 9312 <= codePoint && codePoint <= 9449 || 9451 <= codePoint && codePoint <= 9547 || 9552 <= codePoint && codePoint <= 9587 || 9600 <= codePoint && codePoint <= 9615 || 9618 <= codePoint && codePoint <= 9621 || 9632 <= codePoint && codePoint <= 9633 || 9635 <= codePoint && codePoint <= 9641 || 9650 <= codePoint && codePoint <= 9651 || 9654 <= codePoint && codePoint <= 9655 || 9660 <= codePoint && codePoint <= 9661 || 9664 <= codePoint && codePoint <= 9665 || 9670 <= codePoint && codePoint <= 9672 || 9675 == codePoint || 9678 <= codePoint && codePoint <= 9681 || 9698 <= codePoint && codePoint <= 9701 || 9711 == codePoint || 9733 <= codePoint && codePoint <= 9734 || 9737 == codePoint || 9742 <= codePoint && codePoint <= 9743 || 9748 <= codePoint && codePoint <= 9749 || 9756 == codePoint || 9758 == codePoint || 9792 == codePoint || 9794 == codePoint || 9824 <= codePoint && codePoint <= 9825 || 9827 <= codePoint && codePoint <= 9829 || 9831 <= codePoint && codePoint <= 9834 || 9836 <= codePoint && codePoint <= 9837 || 9839 == codePoint || 9886 <= codePoint && codePoint <= 9887 || 9918 <= codePoint && codePoint <= 9919 || 9924 <= codePoint && codePoint <= 9933 || 9935 <= codePoint && codePoint <= 9953 || 9955 == codePoint || 9960 <= codePoint && codePoint <= 9983 || 10045 == codePoint || 10071 == codePoint || 10102 <= codePoint && codePoint <= 10111 || 11093 <= codePoint && codePoint <= 11097 || 12872 <= codePoint && codePoint <= 12879 || 57344 <= codePoint && codePoint <= 63743 || 65024 <= codePoint && codePoint <= 65039 || 65533 == codePoint || 127232 <= codePoint && codePoint <= 127242 || 127248 <= codePoint && codePoint <= 127277 || 127280 <= codePoint && codePoint <= 127337 || 127344 <= codePoint && codePoint <= 127386 || 917760 <= codePoint && codePoint <= 917999 || 983040 <= codePoint && codePoint <= 1048573 || 1048576 <= codePoint && codePoint <= 1114109) {
          return "A";
        }
        return "N";
      };
      eaw.characterLength = function(character) {
        var code = this.eastAsianWidth(character);
        if (code == "F" || code == "W" || code == "A") {
          return 2;
        } else {
          return 1;
        }
      };
      function stringToArray(string) {
        return string.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
      }
      eaw.length = function(string) {
        var characters = stringToArray(string);
        var len = 0;
        for (var i = 0; i < characters.length; i++) {
          len = len + this.characterLength(characters[i]);
        }
        return len;
      };
      eaw.slice = function(text, start2, end) {
        textLen = eaw.length(text);
        start2 = start2 ? start2 : 0;
        end = end ? end : 1;
        if (start2 < 0) {
          start2 = textLen + start2;
        }
        if (end < 0) {
          end = textLen + end;
        }
        var result = "";
        var eawLen = 0;
        var chars = stringToArray(text);
        for (var i = 0; i < chars.length; i++) {
          var char = chars[i];
          var charLen = eaw.length(char);
          if (eawLen >= start2 - (charLen == 2 ? 1 : 0)) {
            if (eawLen + charLen <= end) {
              result += char;
            } else {
              break;
            }
          }
          eawLen += charLen;
        }
        return result;
      };
    })(eastasianwidth);
    dateTimeFormat = new Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    levels = {
      debug: 20,
      info: 30,
      warn: 40,
      error: 50,
      silent: 90
    };
    if (typeof process !== "undefined") {
      let proc = process;
      if ("argv" in proc && Array.isArray(proc.argv)) {
        if (proc.argv.includes("--verbose"))
          ;
        else if (proc.argv.includes("--silent"))
          ;
        else
          ;
      }
    }
    VALID_PARAM_TYPES = ["string", "number", "undefined"];
    __accessCheck$1 = (obj, member, msg) => {
      if (!member.has(obj))
        throw TypeError("Cannot " + msg);
    };
    __privateGet$1 = (obj, member, getter) => {
      __accessCheck$1(obj, member, "read from private field");
      return getter ? getter.call(obj) : member.get(obj);
    };
    __privateAdd$1 = (obj, member, value) => {
      if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
      member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    };
    __privateSet$1 = (obj, member, value, setter) => {
      __accessCheck$1(obj, member, "write to private field");
      setter ? setter.call(obj, value) : member.set(obj, value);
      return value;
    };
    clientAddressSymbol$1 = Symbol.for("astro.clientAddress");
    Slots = class {
      constructor(result, slots, logging) {
        __privateAdd$1(this, _result, void 0);
        __privateAdd$1(this, _slots, void 0);
        __privateAdd$1(this, _loggingOpts, void 0);
        __privateSet$1(this, _result, result);
        __privateSet$1(this, _slots, slots);
        __privateSet$1(this, _loggingOpts, logging);
        if (slots) {
          for (const key of Object.keys(slots)) {
            if (this[key] !== void 0) {
              throw new AstroError({
                ...AstroErrorData.ReservedSlotName,
                message: AstroErrorData.ReservedSlotName.message(key)
              });
            }
            Object.defineProperty(this, key, {
              get() {
                return true;
              },
              enumerable: true
            });
          }
        }
      }
      has(name) {
        if (!__privateGet$1(this, _slots))
          return false;
        return Boolean(__privateGet$1(this, _slots)[name]);
      }
      async render(name, args = []) {
        if (!__privateGet$1(this, _slots) || !this.has(name))
          return;
        const scoped = createScopedResult(__privateGet$1(this, _result), ScopeFlags.RenderSlot);
        if (!Array.isArray(args)) {
          warn(
            __privateGet$1(this, _loggingOpts),
            "Astro.slots.render",
            `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`
          );
        } else if (args.length > 0) {
          const slotValue = __privateGet$1(this, _slots)[name];
          const component = typeof slotValue === "function" ? await slotValue(scoped) : await slotValue;
          const expression = getFunctionExpression(component);
          if (expression) {
            const slot = () => expression(...args);
            return await renderSlot(scoped, slot).then((res) => res != null ? String(res) : res);
          }
          if (typeof component === "function") {
            return await renderJSX(scoped, component(...args)).then(
              (res) => res != null ? String(res) : res
            );
          }
        }
        const content = await renderSlot(scoped, __privateGet$1(this, _slots)[name]);
        const outHTML = stringifyChunk(scoped, content);
        return outHTML;
      }
    };
    _result = /* @__PURE__ */ new WeakMap();
    _slots = /* @__PURE__ */ new WeakMap();
    _loggingOpts = /* @__PURE__ */ new WeakMap();
    renderMarkdown = null;
    RouteCache = class {
      constructor(logging, mode = "production") {
        this.cache = {};
        this.logging = logging;
        this.mode = mode;
      }
      clearAll() {
        this.cache = {};
      }
      set(route, entry) {
        if (this.mode === "production" && this.cache[route.component]) {
          warn(
            this.logging,
            "routeCache",
            `Internal Warning: route cache overwritten. (${route.component})`
          );
        }
        this.cache[route.component] = entry;
      }
      get(route) {
        return this.cache[route.component];
      }
    };
    GetParamsAndPropsError = /* @__PURE__ */ ((GetParamsAndPropsError2) => {
      GetParamsAndPropsError2[GetParamsAndPropsError2["NoMatchingStaticPath"] = 0] = "NoMatchingStaticPath";
      return GetParamsAndPropsError2;
    })(GetParamsAndPropsError || {});
    clientAddressSymbol = Symbol.for("astro.clientAddress");
    lastMessageCount = 1;
    consoleLogDestination = {
      write(event) {
        let dest = console.error;
        if (levels[event.level] < levels["error"]) {
          dest = console.log;
        }
        function getPrefix() {
          let prefix = "";
          let type = event.type;
          if (type) {
            prefix += dim(dateTimeFormat.format(new Date()) + " ");
            if (event.level === "info") {
              type = bold(cyan(`[${type}]`));
            } else if (event.level === "warn") {
              type = bold(yellow(`[${type}]`));
            } else if (event.level === "error") {
              type = bold(red(`[${type}]`));
            }
            prefix += `${type} `;
          }
          return reset(prefix);
        }
        let message = event.message;
        if (message === lastMessage) {
          lastMessageCount++;
          message = `${message} ${yellow(`(x${lastMessageCount})`)}`;
        } else {
          lastMessage = message;
          lastMessageCount = 1;
        }
        const outMessage = getPrefix() + message;
        dest(outMessage);
        return true;
      }
    };
    __accessCheck = (obj, member, msg) => {
      if (!member.has(obj))
        throw TypeError("Cannot " + msg);
    };
    __privateGet = (obj, member, getter) => {
      __accessCheck(obj, member, "read from private field");
      return getter ? getter.call(obj) : member.get(obj);
    };
    __privateAdd = (obj, member, value) => {
      if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
      member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    };
    __privateSet = (obj, member, value, setter) => {
      __accessCheck(obj, member, "write to private field");
      setter ? setter.call(obj, value) : member.set(obj, value);
      return value;
    };
    __privateMethod = (obj, member, method) => {
      __accessCheck(obj, member, "access private method");
      return method;
    };
    App = class {
      constructor(manifest, streaming = true) {
        __privateAdd(this, _renderPage);
        __privateAdd(this, _callEndpoint);
        __privateAdd(this, _env, void 0);
        __privateAdd(this, _manifest, void 0);
        __privateAdd(this, _manifestData, void 0);
        __privateAdd(this, _routeDataToRouteInfo, void 0);
        __privateAdd(this, _encoder, new TextEncoder());
        __privateAdd(this, _logging, {
          dest: consoleLogDestination,
          level: "info"
        });
        __privateAdd(this, _base, void 0);
        __privateAdd(this, _baseWithoutTrailingSlash, void 0);
        __privateSet(this, _manifest, manifest);
        __privateSet(this, _manifestData, {
          routes: manifest.routes.map((route) => route.routeData)
        });
        __privateSet(this, _routeDataToRouteInfo, new Map(manifest.routes.map((route) => [route.routeData, route])));
        __privateSet(this, _env, createEnvironment({
          adapterName: manifest.adapterName,
          logging: __privateGet(this, _logging),
          markdown: manifest.markdown,
          mode: "production",
          renderers: manifest.renderers,
          async resolve(specifier) {
            if (!(specifier in manifest.entryModules)) {
              throw new Error(`Unable to resolve [${specifier}]`);
            }
            const bundlePath = manifest.entryModules[specifier];
            switch (true) {
              case bundlePath.startsWith("data:"):
              case bundlePath.length === 0: {
                return bundlePath;
              }
              default: {
                return prependForwardSlash(joinPaths(manifest.base, bundlePath));
              }
            }
          },
          routeCache: new RouteCache(__privateGet(this, _logging)),
          site: __privateGet(this, _manifest).site,
          ssr: true,
          streaming
        }));
        __privateSet(this, _base, __privateGet(this, _manifest).base || "/");
        __privateSet(this, _baseWithoutTrailingSlash, removeTrailingForwardSlash(__privateGet(this, _base)));
      }
      removeBase(pathname) {
        if (pathname.startsWith(__privateGet(this, _base))) {
          return pathname.slice(__privateGet(this, _baseWithoutTrailingSlash).length + 1);
        }
        return pathname;
      }
      match(request, { matchNotFound = false } = {}) {
        const url6 = new URL(request.url);
        if (__privateGet(this, _manifest).assets.has(url6.pathname)) {
          return void 0;
        }
        let pathname = "/" + this.removeBase(url6.pathname);
        let routeData = matchRoute(pathname, __privateGet(this, _manifestData));
        if (routeData) {
          const asset = matchAssets(routeData, __privateGet(this, _manifest).assets);
          if (asset)
            return void 0;
          return routeData;
        } else if (matchNotFound) {
          return matchRoute("/404", __privateGet(this, _manifestData));
        } else {
          return void 0;
        }
      }
      async render(request, routeData) {
        let defaultStatus = 200;
        if (!routeData) {
          routeData = this.match(request);
          if (!routeData) {
            defaultStatus = 404;
            routeData = this.match(request, { matchNotFound: true });
          }
          if (!routeData) {
            return new Response(null, {
              status: 404,
              statusText: "Not found"
            });
          }
        }
        if (routeData.route === "/404") {
          defaultStatus = 404;
        }
        let mod = __privateGet(this, _manifest).pageMap.get(routeData.component);
        if (routeData.type === "page") {
          let response = await __privateMethod(this, _renderPage, renderPage_fn).call(this, request, routeData, mod, defaultStatus);
          if (response.status === 500) {
            const fiveHundredRouteData = matchRoute("/500", __privateGet(this, _manifestData));
            if (fiveHundredRouteData) {
              mod = __privateGet(this, _manifest).pageMap.get(fiveHundredRouteData.component);
              try {
                let fiveHundredResponse = await __privateMethod(this, _renderPage, renderPage_fn).call(this, request, fiveHundredRouteData, mod, 500);
                return fiveHundredResponse;
              } catch {
              }
            }
          }
          return response;
        } else if (routeData.type === "endpoint") {
          return __privateMethod(this, _callEndpoint, callEndpoint_fn).call(this, request, routeData, mod, defaultStatus);
        } else {
          throw new Error(`Unsupported route type [${routeData.type}].`);
        }
      }
      setCookieHeaders(response) {
        return getSetCookiesFromResponse(response);
      }
    };
    _env = /* @__PURE__ */ new WeakMap();
    _manifest = /* @__PURE__ */ new WeakMap();
    _manifestData = /* @__PURE__ */ new WeakMap();
    _routeDataToRouteInfo = /* @__PURE__ */ new WeakMap();
    _encoder = /* @__PURE__ */ new WeakMap();
    _logging = /* @__PURE__ */ new WeakMap();
    _base = /* @__PURE__ */ new WeakMap();
    _baseWithoutTrailingSlash = /* @__PURE__ */ new WeakMap();
    _renderPage = /* @__PURE__ */ new WeakSet();
    renderPage_fn = async function(request, routeData, mod, status = 200) {
      const url6 = new URL(request.url);
      const pathname = "/" + this.removeBase(url6.pathname);
      const info = __privateGet(this, _routeDataToRouteInfo).get(routeData);
      const links = createLinkStylesheetElementSet(info.links);
      let scripts = /* @__PURE__ */ new Set();
      for (const script of info.scripts) {
        if ("stage" in script) {
          if (script.stage === "head-inline") {
            scripts.add({
              props: {},
              children: script.children
            });
          }
        } else {
          scripts.add(createModuleScriptElement(script));
        }
      }
      try {
        const ctx = createRenderContext({
          request,
          origin: url6.origin,
          pathname,
          propagation: __privateGet(this, _manifest).propagation,
          scripts,
          links,
          route: routeData,
          status
        });
        const response = await renderPage(mod, ctx, __privateGet(this, _env));
        return response;
      } catch (err) {
        error(__privateGet(this, _logging), "ssr", err.stack || err.message || String(err));
        return new Response(null, {
          status: 500,
          statusText: "Internal server error"
        });
      }
    };
    _callEndpoint = /* @__PURE__ */ new WeakSet();
    callEndpoint_fn = async function(request, routeData, mod, status = 200) {
      const url6 = new URL(request.url);
      const pathname = "/" + this.removeBase(url6.pathname);
      const handler = mod;
      const ctx = createRenderContext({
        request,
        origin: url6.origin,
        pathname,
        route: routeData,
        status
      });
      const result = await call(handler, __privateGet(this, _env), ctx);
      if (result.type === "response") {
        if (result.response.headers.get("X-Astro-Response") === "Not-Found") {
          const fourOhFourRequest = new Request(new URL("/404", request.url));
          const fourOhFourRouteData = this.match(fourOhFourRequest);
          if (fourOhFourRouteData) {
            return this.render(fourOhFourRequest, fourOhFourRouteData);
          }
        }
        return result.response;
      } else {
        const body6 = result.body;
        const headers = new Headers();
        const mimeType = mime.getType(url6.pathname);
        if (mimeType) {
          headers.set("Content-Type", `${mimeType};charset=utf-8`);
        } else {
          headers.set("Content-Type", "text/plain;charset=utf-8");
        }
        const bytes = __privateGet(this, _encoder).encode(body6);
        headers.set("Content-Length", bytes.byteLength.toString());
        const response = new Response(bytes, {
          status: 200,
          headers
        });
        attachToResponse(response, result.cookies);
        return response;
      }
    };
    slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_2, w) => w.toUpperCase());
    server_default = {
      check,
      renderToStaticMarkup
    };
  }
});

// dist/server/chunks/first-post.638333f8.mjs
var first_post_638333f8_exports = {};
__export(first_post_638333f8_exports, {
  _internal: () => _internal,
  body: () => body,
  collection: () => collection,
  data: () => data,
  id: () => id,
  slug: () => slug
});
var id, collection, slug, body, data, _internal;
var init_first_post_638333f8 = __esm({
  "dist/server/chunks/first-post.638333f8.mjs"() {
    "use strict";
    init_astro_1790c127();
    id = "first-post.mdx";
    collection = "blog";
    slug = "first-post";
    body = "\n# Test Site\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.\n\nMorbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut. Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis. In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam. Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi.\n\nMollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum. Tristique et egestas quis ipsum suspendisse ultrices. Eget lorem dolor sed viverra ipsum. Vel turpis nunc eget lorem dolor sed viverra. Posuere ac ut consequat semper viverra nam. Laoreet suspendisse interdum consectetur libero id faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices tincidunt arcu non sodales neque. Tempus egestas sed sed risus pretium quam vulputate. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Fringilla urna porttitor rhoncus dolor purus non. Amet dictum sit amet justo donec enim.\n\nMattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu. Id cursus metus aliquam eleifend mi.\n\nTempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Egestas integer eget aliquet nibh praesent tristique magna.\n";
    data = {
      title: "First post",
      description: "Lorem ipsum dolor sit amet",
      pubDate: new Date(16572528e5),
      heroImage: "/placeholder-hero.jpg"
    };
    _internal = {
      filePath: "/home/jim/code/astro/prerender-deno/src/content/blog/first-post.mdx",
      rawData: '\ntitle: "First post"\ndescription: "Lorem ipsum dolor sit amet"\npubDate: "Jul 08 2022"\nheroImage: "/placeholder-hero.jpg"'
    };
  }
});

// dist/server/chunks/markdown-style-guide.600a133d.mjs
var markdown_style_guide_600a133d_exports = {};
__export(markdown_style_guide_600a133d_exports, {
  _internal: () => _internal2,
  body: () => body2,
  collection: () => collection2,
  data: () => data2,
  id: () => id2,
  slug: () => slug2
});
var id2, collection2, slug2, body2, data2, _internal2;
var init_markdown_style_guide_600a133d = __esm({
  "dist/server/chunks/markdown-style-guide.600a133d.mjs"() {
    "use strict";
    id2 = "markdown-style-guide.md";
    collection2 = "blog";
    slug2 = "markdown-style-guide";
    body2 = '\nHere is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.\n\n## Headings\n\nThe following HTML `<h1>`\u2014`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level while `<h6>` is the lowest.\n\n# H1\n\n## H2\n\n### H3\n\n#### H4\n\n##### H5\n\n###### H6\n\n## Paragraph\n\nXerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.\n\nItatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.\n\n## Images\n\n![This is a placeholder image description](/placeholder-social.jpg)\n\n## Blockquotes\n\nThe blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations.\n\n#### Blockquote without attribution\n\n> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  \n> **Note** that you can use _Markdown syntax_ within a blockquote.\n\n#### Blockquote with attribution\n\n> Don\'t communicate by sharing memory, share memory by communicating.<br>\n> \u2014 <cite>Rob Pike[^1]</cite>\n\n[^1]: The above quote is excerpted from Rob Pike\'s [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.\n\n## Tables\n\n| Italics   | Bold     | Code   |\n| --------- | -------- | ------ |\n| _italics_ | **bold** | `code` |\n\n## Code Blocks\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>Example HTML5 Document</title>\n  </head>\n  <body>\n    <p>Test</p>\n  </body>\n</html>\n```\n\n## List Types\n\n#### Ordered List\n\n1. First item\n2. Second item\n3. Third item\n\n#### Unordered List\n\n- List item\n- Another item\n- And another item\n\n#### Nested list\n\n- Fruit\n  - Apple\n  - Orange\n  - Banana\n- Dairy\n  - Milk\n  - Cheese\n\n## Other Elements \u2014 abbr, sub, sup, kbd, mark\n\n<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.\n\nH<sub>2</sub>O\n\nX<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>\n\nPress <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.\n\nMost <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.\n';
    data2 = { title: "Markdown Style Guide", description: "Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.", pubDate: new Date(1656648e6), heroImage: "/placeholder-hero.jpg" };
    _internal2 = {
      filePath: "/home/jim/code/astro/prerender-deno/src/content/blog/markdown-style-guide.md",
      rawData: '\ntitle: "Markdown Style Guide"\ndescription: "Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro."\npubDate: "Jul 01 2022"\nheroImage: "/placeholder-hero.jpg"'
    };
  }
});

// dist/server/chunks/second-post.23000fb7.mjs
var second_post_23000fb7_exports = {};
__export(second_post_23000fb7_exports, {
  _internal: () => _internal3,
  body: () => body3,
  collection: () => collection3,
  data: () => data3,
  id: () => id3,
  slug: () => slug3
});
var id3, collection3, slug3, body3, data3, _internal3;
var init_second_post_23000fb7 = __esm({
  "dist/server/chunks/second-post.23000fb7.mjs"() {
    "use strict";
    id3 = "second-post.md";
    collection3 = "blog";
    slug3 = "second-post";
    body3 = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.\n\nMorbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut. Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis. In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam. Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi.\n\nMollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum. Tristique et egestas quis ipsum suspendisse ultrices. Eget lorem dolor sed viverra ipsum. Vel turpis nunc eget lorem dolor sed viverra. Posuere ac ut consequat semper viverra nam. Laoreet suspendisse interdum consectetur libero id faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices tincidunt arcu non sodales neque. Tempus egestas sed sed risus pretium quam vulputate. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Fringilla urna porttitor rhoncus dolor purus non. Amet dictum sit amet justo donec enim.\n\nMattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu. Id cursus metus aliquam eleifend mi.\n\nTempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Egestas integer eget aliquet nibh praesent tristique magna.\n";
    data3 = { title: "Second post", description: "Lorem ipsum dolor sit amet", pubDate: new Date(16584624e5), heroImage: "/placeholder-hero.jpg" };
    _internal3 = {
      filePath: "/home/jim/code/astro/prerender-deno/src/content/blog/second-post.md",
      rawData: '\ntitle: "Second post"\ndescription: "Lorem ipsum dolor sit amet"\npubDate: "Jul 22 2022"\nheroImage: "/placeholder-hero.jpg"'
    };
  }
});

// dist/server/chunks/third-post.8038df00.mjs
var third_post_8038df00_exports = {};
__export(third_post_8038df00_exports, {
  _internal: () => _internal4,
  body: () => body4,
  collection: () => collection4,
  data: () => data4,
  id: () => id4,
  slug: () => slug4
});
var id4, collection4, slug4, body4, data4, _internal4;
var init_third_post_8038df00 = __esm({
  "dist/server/chunks/third-post.8038df00.mjs"() {
    "use strict";
    id4 = "third-post.md";
    collection4 = "blog";
    slug4 = "third-post";
    body4 = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.\n\nMorbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut. Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis. In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam. Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi.\n\nMollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum. Tristique et egestas quis ipsum suspendisse ultrices. Eget lorem dolor sed viverra ipsum. Vel turpis nunc eget lorem dolor sed viverra. Posuere ac ut consequat semper viverra nam. Laoreet suspendisse interdum consectetur libero id faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices tincidunt arcu non sodales neque. Tempus egestas sed sed risus pretium quam vulputate. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Fringilla urna porttitor rhoncus dolor purus non. Amet dictum sit amet justo donec enim.\n\nMattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu. Id cursus metus aliquam eleifend mi.\n\nTempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Egestas integer eget aliquet nibh praesent tristique magna.\n";
    data4 = { title: "Third post", description: "Lorem ipsum dolor sit amet", pubDate: new Date(16578576e5), heroImage: "/placeholder-hero.jpg" };
    _internal4 = {
      filePath: "/home/jim/code/astro/prerender-deno/src/content/blog/third-post.md",
      rawData: '\ntitle: "Third post"\ndescription: "Lorem ipsum dolor sit amet"\npubDate: "Jul 15 2022"\nheroImage: "/placeholder-hero.jpg"'
    };
  }
});

// dist/server/chunks/using-mdx.f439665d.mjs
var using_mdx_f439665d_exports = {};
__export(using_mdx_f439665d_exports, {
  _internal: () => _internal5,
  body: () => body5,
  collection: () => collection5,
  data: () => data5,
  id: () => id5,
  slug: () => slug5
});
var id5, collection5, slug5, body5, data5, _internal5;
var init_using_mdx_f439665d = __esm({
  "dist/server/chunks/using-mdx.f439665d.mjs"() {
    "use strict";
    init_astro_1790c127();
    id5 = "using-mdx.mdx";
    collection5 = "blog";
    slug5 = "using-mdx";
    body5 = `
This theme comes with the [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) integration installed and configured in your \`astro.config.mjs\` config file. If you prefer not to use MDX, you can disable support by removing the integration from your config file.

## Why MDX?

MDX is a special flavor of Markdown that supports embedded JavaScript & JSX syntax. This unlocks the ability to [mix JavaScript and UI Components into your Markdown content](https://docs.astro.build/en/guides/markdown-content/#mdx-features) for things like interactive charts or alerts.

If you have existing content authored in MDX, this integration will hopefully make migrating to Astro a breeze.

## Example

Here is how you import and use a UI component inside of MDX.  
When you open this page in the browser, you should see the clickable button below.

import HeaderLink from '../../components/HeaderLink.astro';

<HeaderLink href="#" onclick="alert('clicked!')">
	Embedded component in MDX
</HeaderLink>

## More Links

- [MDX Syntax Documentation](https://mdxjs.com/docs/what-is-mdx)
- [Astro Usage Documentation](https://docs.astro.build/en/guides/markdown-content/#markdown-and-mdx-pages)
- **Note:** [Client Directives](https://docs.astro.build/en/reference/directives-reference/#client-directives) are still required to create interactive components. Otherwise, all components in your MDX will render as static HTML (no JavaScript) by default.
`;
    data5 = {
      title: "Using MDX",
      description: "Lorem ipsum dolor sit amet",
      pubDate: new Date(16567344e5),
      heroImage: "/placeholder-hero.jpg"
    };
    _internal5 = {
      filePath: "/home/jim/code/astro/prerender-deno/src/content/blog/using-mdx.mdx",
      rawData: "\ntitle: 'Using MDX'\ndescription: 'Lorem ipsum dolor sit amet'\npubDate: 'Jul 02 2022'\nheroImage: '/placeholder-hero.jpg'"
    };
  }
});

// dist/server/chunks/first-post.7d935176.mjs
var first_post_7d935176_exports = {};
__export(first_post_7d935176_exports, {
  Content: () => Content,
  default: () => Content,
  file: () => file,
  frontmatter: () => frontmatter,
  getHeadings: () => getHeadings,
  url: () => url
});
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "test-site",
    "text": "Test Site"
  }];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "test-site",
      children: "Test Site"
    }), "\n", createVNode(_components.p, {
      children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet."
    }), "\n", createVNode(_components.p, {
      children: "Morbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut. Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis. In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam. Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi."
    }), "\n", createVNode(_components.p, {
      children: "Mollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum. Tristique et egestas quis ipsum suspendisse ultrices. Eget lorem dolor sed viverra ipsum. Vel turpis nunc eget lorem dolor sed viverra. Posuere ac ut consequat semper viverra nam. Laoreet suspendisse interdum consectetur libero id faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices tincidunt arcu non sodales neque. Tempus egestas sed sed risus pretium quam vulputate. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Fringilla urna porttitor rhoncus dolor purus non. Amet dictum sit amet justo donec enim."
    }), "\n", createVNode(_components.p, {
      children: "Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu. Id cursus metus aliquam eleifend mi."
    }), "\n", createVNode(_components.p, {
      children: "Tempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Egestas integer eget aliquet nibh praesent tristique magna."
    })]
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
var frontmatter, url, file, Content;
var init_first_post_7d935176 = __esm({
  "dist/server/chunks/first-post.7d935176.mjs"() {
    "use strict";
    init_astro_1790c127();
    frontmatter = {
      "title": "First post",
      "description": "Lorem ipsum dolor sit amet",
      "pubDate": "Jul 08 2022",
      "heroImage": "/placeholder-hero.jpg"
    };
    __astro_tag_component__(getHeadings, "astro:jsx");
    __astro_tag_component__(MDXContent, "astro:jsx");
    url = "src/content/blog/first-post.mdx";
    file = "/home/jim/code/astro/prerender-deno/src/content/blog/first-post.mdx";
    Content = (props = {}) => MDXContent({
      ...props,
      components: { Fragment, ...props.components }
    });
    Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
  }
});

// dist/server/chunks/first-post.579ad298.mjs
var first_post_579ad298_exports = {};
__export(first_post_579ad298_exports, {
  collectedLinks: () => collectedLinks,
  collectedScripts: () => collectedScripts,
  collectedStyles: () => collectedStyles,
  getMod: () => getMod
});
async function getMod() {
  return Promise.resolve().then(() => (init_first_post_7d935176(), first_post_7d935176_exports));
}
var collectedLinks, collectedStyles, collectedScripts;
var init_first_post_579ad298 = __esm({
  "dist/server/chunks/first-post.579ad298.mjs"() {
    "use strict";
    init_astro_1790c127();
    collectedLinks = "@@ASTRO-LINKS@@";
    collectedStyles = "@@ASTRO-STYLES@@";
    collectedScripts = "@@ASTRO-SCRIPTS@@";
    __astro_tag_component__(getMod, "astro:jsx");
  }
});

// dist/server/chunks/markdown-style-guide.67109a56.mjs
var markdown_style_guide_67109a56_exports = {};
__export(markdown_style_guide_67109a56_exports, {
  Content: () => Content2,
  compiledContent: () => compiledContent,
  default: () => Content2,
  file: () => file2,
  frontmatter: () => frontmatter2,
  getHeadings: () => getHeadings2,
  rawContent: () => rawContent,
  url: () => url2
});
function rawContent() {
  return '\nHere is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.\n\n## Headings\n\nThe following HTML `<h1>`\u2014`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level while `<h6>` is the lowest.\n\n# H1\n\n## H2\n\n### H3\n\n#### H4\n\n##### H5\n\n###### H6\n\n## Paragraph\n\nXerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.\n\nItatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.\n\n## Images\n\n![This is a placeholder image description](/placeholder-social.jpg)\n\n## Blockquotes\n\nThe blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations.\n\n#### Blockquote without attribution\n\n> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  \n> **Note** that you can use _Markdown syntax_ within a blockquote.\n\n#### Blockquote with attribution\n\n> Don\'t communicate by sharing memory, share memory by communicating.<br>\n> \u2014 <cite>Rob Pike[^1]</cite>\n\n[^1]: The above quote is excerpted from Rob Pike\'s [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.\n\n## Tables\n\n| Italics   | Bold     | Code   |\n| --------- | -------- | ------ |\n| _italics_ | **bold** | `code` |\n\n## Code Blocks\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>Example HTML5 Document</title>\n  </head>\n  <body>\n    <p>Test</p>\n  </body>\n</html>\n```\n\n## List Types\n\n#### Ordered List\n\n1. First item\n2. Second item\n3. Third item\n\n#### Unordered List\n\n- List item\n- Another item\n- And another item\n\n#### Nested list\n\n- Fruit\n  - Apple\n  - Orange\n  - Banana\n- Dairy\n  - Milk\n  - Cheese\n\n## Other Elements \u2014 abbr, sub, sup, kbd, mark\n\n<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.\n\nH<sub>2</sub>O\n\nX<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>\n\nPress <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.\n\nMost <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.\n';
}
function compiledContent() {
  return html;
}
function getHeadings2() {
  return [{ "depth": 2, "slug": "headings", "text": "Headings" }, { "depth": 1, "slug": "h1", "text": "H1" }, { "depth": 2, "slug": "h2", "text": "H2" }, { "depth": 3, "slug": "h3", "text": "H3" }, { "depth": 4, "slug": "h4", "text": "H4" }, { "depth": 5, "slug": "h5", "text": "H5" }, { "depth": 6, "slug": "h6", "text": "H6" }, { "depth": 2, "slug": "paragraph", "text": "Paragraph" }, { "depth": 2, "slug": "images", "text": "Images" }, { "depth": 2, "slug": "blockquotes", "text": "Blockquotes" }, { "depth": 4, "slug": "blockquote-without-attribution", "text": "Blockquote without attribution" }, { "depth": 4, "slug": "blockquote-with-attribution", "text": "Blockquote with attribution" }, { "depth": 2, "slug": "tables", "text": "Tables" }, { "depth": 2, "slug": "code-blocks", "text": "Code Blocks" }, { "depth": 2, "slug": "list-types", "text": "List Types" }, { "depth": 4, "slug": "ordered-list", "text": "Ordered List" }, { "depth": 4, "slug": "unordered-list", "text": "Unordered List" }, { "depth": 4, "slug": "nested-list", "text": "Nested list" }, { "depth": 2, "slug": "other-elements--abbr-sub-sup-kbd-mark", "text": "Other Elements \u2014 abbr, sub, sup, kbd, mark" }, { "depth": 2, "slug": "footnote-label", "text": "Footnotes" }];
}
async function Content2() {
  const { layout, ...content } = frontmatter2;
  content.file = file2;
  content.url = url2;
  const contentFragment = createVNode(Fragment, { "set:html": html });
  return contentFragment;
}
var html, frontmatter2, file2, url2;
var init_markdown_style_guide_67109a56 = __esm({
  "dist/server/chunks/markdown-style-guide.67109a56.mjs"() {
    "use strict";
    init_astro_1790c127();
    html = '<p>Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.</p>\n<h2 id="headings">Headings</h2>\n<p>The following HTML <code>&#x3C;h1></code>\u2014<code>&#x3C;h6></code> elements represent six levels of section headings. <code>&#x3C;h1></code> is the highest section level while <code>&#x3C;h6></code> is the lowest.</p>\n<h1 id="h1">H1</h1>\n<h2 id="h2">H2</h2>\n<h3 id="h3">H3</h3>\n<h4 id="h4">H4</h4>\n<h5 id="h5">H5</h5>\n<h6 id="h6">H6</h6>\n<h2 id="paragraph">Paragraph</h2>\n<p>Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.</p>\n<p>Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.</p>\n<h2 id="images">Images</h2>\n<p><img src="/placeholder-social.jpg" alt="This is a placeholder image description"></p>\n<h2 id="blockquotes">Blockquotes</h2>\n<p>The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a <code>footer</code> or <code>cite</code> element, and optionally with in-line changes such as annotations and abbreviations.</p>\n<h4 id="blockquote-without-attribution">Blockquote without attribution</h4>\n<blockquote>\n<p>Tiam, ad mint andaepu dandae nostion secatur sequo quae.<br>\n<strong>Note</strong> that you can use <em>Markdown syntax</em> within a blockquote.</p>\n</blockquote>\n<h4 id="blockquote-with-attribution">Blockquote with attribution</h4>\n<blockquote>\n<p>Don\u2019t communicate by sharing memory, share memory by communicating.<br>\n\u2014 <cite>Rob Pike<sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref="" aria-describedby="footnote-label">1</a></sup></cite></p>\n</blockquote>\n<h2 id="tables">Tables</h2>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Italics</th><th>Bold</th><th>Code</th></tr></thead><tbody><tr><td><em>italics</em></td><td><strong>bold</strong></td><td><code>code</code></td></tr></tbody></table>\n<h2 id="code-blocks">Code Blocks</h2>\n<pre is:raw="" class="astro-code" style="background-color: #0d1117; overflow-x: auto;"><code><span class="line"><span style="color: #C9D1D9">&#x3C;!</span><span style="color: #7EE787">DOCTYPE</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">html</span><span style="color: #C9D1D9">></span></span>\n<span class="line"><span style="color: #C9D1D9">&#x3C;</span><span style="color: #7EE787">html</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">lang</span><span style="color: #C9D1D9">=</span><span style="color: #A5D6FF">"en"</span><span style="color: #C9D1D9">></span></span>\n<span class="line"><span style="color: #C9D1D9">  &#x3C;</span><span style="color: #7EE787">head</span><span style="color: #C9D1D9">></span></span>\n<span class="line"><span style="color: #C9D1D9">    &#x3C;</span><span style="color: #7EE787">meta</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">charset</span><span style="color: #C9D1D9">=</span><span style="color: #A5D6FF">"utf-8"</span><span style="color: #C9D1D9"> /></span></span>\n<span class="line"><span style="color: #C9D1D9">    &#x3C;</span><span style="color: #7EE787">title</span><span style="color: #C9D1D9">>Example HTML5 Document&#x3C;/</span><span style="color: #7EE787">title</span><span style="color: #C9D1D9">></span></span>\n<span class="line"><span style="color: #C9D1D9">  &#x3C;/</span><span style="color: #7EE787">head</span><span style="color: #C9D1D9">></span></span>\n<span class="line"><span style="color: #C9D1D9">  &#x3C;</span><span style="color: #7EE787">body</span><span style="color: #C9D1D9">></span></span>\n<span class="line"><span style="color: #C9D1D9">    &#x3C;</span><span style="color: #7EE787">p</span><span style="color: #C9D1D9">>Test&#x3C;/</span><span style="color: #7EE787">p</span><span style="color: #C9D1D9">></span></span>\n<span class="line"><span style="color: #C9D1D9">  &#x3C;/</span><span style="color: #7EE787">body</span><span style="color: #C9D1D9">></span></span>\n<span class="line"><span style="color: #C9D1D9">&#x3C;/</span><span style="color: #7EE787">html</span><span style="color: #C9D1D9">></span></span></code></pre>\n<h2 id="list-types">List Types</h2>\n<h4 id="ordered-list">Ordered List</h4>\n<ol>\n<li>First item</li>\n<li>Second item</li>\n<li>Third item</li>\n</ol>\n<h4 id="unordered-list">Unordered List</h4>\n<ul>\n<li>List item</li>\n<li>Another item</li>\n<li>And another item</li>\n</ul>\n<h4 id="nested-list">Nested list</h4>\n<ul>\n<li>Fruit\n<ul>\n<li>Apple</li>\n<li>Orange</li>\n<li>Banana</li>\n</ul>\n</li>\n<li>Dairy\n<ul>\n<li>Milk</li>\n<li>Cheese</li>\n</ul>\n</li>\n</ul>\n<h2 id="other-elements--abbr-sub-sup-kbd-mark">Other Elements \u2014 abbr, sub, sup, kbd, mark</h2>\n<p><abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.</p>\n<p>H<sub>2</sub>O</p>\n<p>X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup></p>\n<p>Press <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.</p>\n<p>Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.</p>\n<section data-footnotes="" class="footnotes"><h2 class="sr-only" id="footnote-label">Footnotes</h2>\n<ol>\n<li id="user-content-fn-1">\n<p>The above quote is excerpted from Rob Pike\u2019s <a href="https://www.youtube.com/watch?v=PAAkCSZUG1c">talk</a> during Gopherfest, November 18, 2015. <a href="#user-content-fnref-1" data-footnote-backref="" class="data-footnote-backref" aria-label="Back to content">\u21A9</a></p>\n</li>\n</ol>\n</section>';
    frontmatter2 = { "title": "Markdown Style Guide", "description": "Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.", "pubDate": "Jul 01 2022", "heroImage": "/placeholder-hero.jpg" };
    file2 = "/home/jim/code/astro/prerender-deno/src/content/blog/markdown-style-guide.md";
    url2 = void 0;
    Content2[Symbol.for("astro.needsHeadRendering")] = true;
  }
});

// dist/server/chunks/markdown-style-guide.eee11036.mjs
var markdown_style_guide_eee11036_exports = {};
__export(markdown_style_guide_eee11036_exports, {
  collectedLinks: () => collectedLinks2,
  collectedScripts: () => collectedScripts2,
  collectedStyles: () => collectedStyles2,
  getMod: () => getMod2
});
async function getMod2() {
  return Promise.resolve().then(() => (init_markdown_style_guide_67109a56(), markdown_style_guide_67109a56_exports));
}
var collectedLinks2, collectedStyles2, collectedScripts2;
var init_markdown_style_guide_eee11036 = __esm({
  "dist/server/chunks/markdown-style-guide.eee11036.mjs"() {
    "use strict";
    collectedLinks2 = "@@ASTRO-LINKS@@";
    collectedStyles2 = "@@ASTRO-STYLES@@";
    collectedScripts2 = "@@ASTRO-SCRIPTS@@";
  }
});

// dist/server/chunks/second-post.acdc4732.mjs
var second_post_acdc4732_exports = {};
__export(second_post_acdc4732_exports, {
  Content: () => Content3,
  compiledContent: () => compiledContent2,
  default: () => Content3,
  file: () => file3,
  frontmatter: () => frontmatter3,
  getHeadings: () => getHeadings3,
  rawContent: () => rawContent2,
  url: () => url3
});
function rawContent2() {
  return "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.\n\nMorbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut. Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis. In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam. Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi.\n\nMollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum. Tristique et egestas quis ipsum suspendisse ultrices. Eget lorem dolor sed viverra ipsum. Vel turpis nunc eget lorem dolor sed viverra. Posuere ac ut consequat semper viverra nam. Laoreet suspendisse interdum consectetur libero id faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices tincidunt arcu non sodales neque. Tempus egestas sed sed risus pretium quam vulputate. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Fringilla urna porttitor rhoncus dolor purus non. Amet dictum sit amet justo donec enim.\n\nMattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu. Id cursus metus aliquam eleifend mi.\n\nTempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Egestas integer eget aliquet nibh praesent tristique magna.\n";
}
function compiledContent2() {
  return html2;
}
function getHeadings3() {
  return [];
}
async function Content3() {
  const { layout, ...content } = frontmatter3;
  content.file = file3;
  content.url = url3;
  const contentFragment = createVNode(Fragment, { "set:html": html2 });
  return contentFragment;
}
var html2, frontmatter3, file3, url3;
var init_second_post_acdc4732 = __esm({
  "dist/server/chunks/second-post.acdc4732.mjs"() {
    "use strict";
    init_astro_1790c127();
    html2 = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.</p>\n<p>Morbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut. Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis. In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam. Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi.</p>\n<p>Mollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum. Tristique et egestas quis ipsum suspendisse ultrices. Eget lorem dolor sed viverra ipsum. Vel turpis nunc eget lorem dolor sed viverra. Posuere ac ut consequat semper viverra nam. Laoreet suspendisse interdum consectetur libero id faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices tincidunt arcu non sodales neque. Tempus egestas sed sed risus pretium quam vulputate. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Fringilla urna porttitor rhoncus dolor purus non. Amet dictum sit amet justo donec enim.</p>\n<p>Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu. Id cursus metus aliquam eleifend mi.</p>\n<p>Tempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Egestas integer eget aliquet nibh praesent tristique magna.</p>";
    frontmatter3 = { "title": "Second post", "description": "Lorem ipsum dolor sit amet", "pubDate": "Jul 22 2022", "heroImage": "/placeholder-hero.jpg" };
    file3 = "/home/jim/code/astro/prerender-deno/src/content/blog/second-post.md";
    url3 = void 0;
    Content3[Symbol.for("astro.needsHeadRendering")] = true;
  }
});

// dist/server/chunks/second-post.7d2ac92b.mjs
var second_post_7d2ac92b_exports = {};
__export(second_post_7d2ac92b_exports, {
  collectedLinks: () => collectedLinks3,
  collectedScripts: () => collectedScripts3,
  collectedStyles: () => collectedStyles3,
  getMod: () => getMod3
});
async function getMod3() {
  return Promise.resolve().then(() => (init_second_post_acdc4732(), second_post_acdc4732_exports));
}
var collectedLinks3, collectedStyles3, collectedScripts3;
var init_second_post_7d2ac92b = __esm({
  "dist/server/chunks/second-post.7d2ac92b.mjs"() {
    "use strict";
    collectedLinks3 = "@@ASTRO-LINKS@@";
    collectedStyles3 = "@@ASTRO-STYLES@@";
    collectedScripts3 = "@@ASTRO-SCRIPTS@@";
  }
});

// dist/server/chunks/third-post.f234ac89.mjs
var third_post_f234ac89_exports = {};
__export(third_post_f234ac89_exports, {
  Content: () => Content4,
  compiledContent: () => compiledContent3,
  default: () => Content4,
  file: () => file4,
  frontmatter: () => frontmatter4,
  getHeadings: () => getHeadings4,
  rawContent: () => rawContent3,
  url: () => url4
});
function rawContent3() {
  return "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.\n\nMorbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut. Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis. In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam. Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi.\n\nMollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum. Tristique et egestas quis ipsum suspendisse ultrices. Eget lorem dolor sed viverra ipsum. Vel turpis nunc eget lorem dolor sed viverra. Posuere ac ut consequat semper viverra nam. Laoreet suspendisse interdum consectetur libero id faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices tincidunt arcu non sodales neque. Tempus egestas sed sed risus pretium quam vulputate. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Fringilla urna porttitor rhoncus dolor purus non. Amet dictum sit amet justo donec enim.\n\nMattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu. Id cursus metus aliquam eleifend mi.\n\nTempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Egestas integer eget aliquet nibh praesent tristique magna.\n";
}
function compiledContent3() {
  return html3;
}
function getHeadings4() {
  return [];
}
async function Content4() {
  const { layout, ...content } = frontmatter4;
  content.file = file4;
  content.url = url4;
  const contentFragment = createVNode(Fragment, { "set:html": html3 });
  return contentFragment;
}
var html3, frontmatter4, file4, url4;
var init_third_post_f234ac89 = __esm({
  "dist/server/chunks/third-post.f234ac89.mjs"() {
    "use strict";
    init_astro_1790c127();
    html3 = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.</p>\n<p>Morbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut. Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis. In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam. Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi.</p>\n<p>Mollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum. Tristique et egestas quis ipsum suspendisse ultrices. Eget lorem dolor sed viverra ipsum. Vel turpis nunc eget lorem dolor sed viverra. Posuere ac ut consequat semper viverra nam. Laoreet suspendisse interdum consectetur libero id faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices tincidunt arcu non sodales neque. Tempus egestas sed sed risus pretium quam vulputate. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Fringilla urna porttitor rhoncus dolor purus non. Amet dictum sit amet justo donec enim.</p>\n<p>Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu. Id cursus metus aliquam eleifend mi.</p>\n<p>Tempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Egestas integer eget aliquet nibh praesent tristique magna.</p>";
    frontmatter4 = { "title": "Third post", "description": "Lorem ipsum dolor sit amet", "pubDate": "Jul 15 2022", "heroImage": "/placeholder-hero.jpg" };
    file4 = "/home/jim/code/astro/prerender-deno/src/content/blog/third-post.md";
    url4 = void 0;
    Content4[Symbol.for("astro.needsHeadRendering")] = true;
  }
});

// dist/server/chunks/third-post.2c694deb.mjs
var third_post_2c694deb_exports = {};
__export(third_post_2c694deb_exports, {
  collectedLinks: () => collectedLinks4,
  collectedScripts: () => collectedScripts4,
  collectedStyles: () => collectedStyles4,
  getMod: () => getMod4
});
async function getMod4() {
  return Promise.resolve().then(() => (init_third_post_f234ac89(), third_post_f234ac89_exports));
}
var collectedLinks4, collectedStyles4, collectedScripts4;
var init_third_post_2c694deb = __esm({
  "dist/server/chunks/third-post.2c694deb.mjs"() {
    "use strict";
    collectedLinks4 = "@@ASTRO-LINKS@@";
    collectedStyles4 = "@@ASTRO-STYLES@@";
    collectedScripts4 = "@@ASTRO-SCRIPTS@@";
  }
});

// dist/server/chunks/using-mdx.489f60b1.mjs
var using_mdx_489f60b1_exports = {};
__export(using_mdx_489f60b1_exports, {
  Content: () => Content5,
  default: () => Content5,
  file: () => file5,
  frontmatter: () => frontmatter5,
  getHeadings: () => getHeadings5,
  url: () => url5
});
function getHeadings5() {
  return [{
    "depth": 2,
    "slug": "why-mdx",
    "text": "Why MDX?"
  }, {
    "depth": 2,
    "slug": "example",
    "text": "Example"
  }, {
    "depth": 2,
    "slug": "more-links",
    "text": "More Links"
  }];
}
function _createMdxContent2(props) {
  const _components = Object.assign({
    p: "p",
    a: "a",
    code: "code",
    h2: "h2",
    br: "br",
    ul: "ul",
    li: "li",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["This theme comes with the ", createVNode(_components.a, {
        href: "https://docs.astro.build/en/guides/integrations-guide/mdx/",
        children: "@astrojs/mdx"
      }), " integration installed and configured in your ", createVNode(_components.code, {
        children: "astro.config.mjs"
      }), " config file. If you prefer not to use MDX, you can disable support by removing the integration from your config file."]
    }), "\n", createVNode(_components.h2, {
      id: "why-mdx",
      children: "Why MDX?"
    }), "\n", createVNode(_components.p, {
      children: ["MDX is a special flavor of Markdown that supports embedded JavaScript & JSX syntax. This unlocks the ability to ", createVNode(_components.a, {
        href: "https://docs.astro.build/en/guides/markdown-content/#mdx-features",
        children: "mix JavaScript and UI Components into your Markdown content"
      }), " for things like interactive charts or alerts."]
    }), "\n", createVNode(_components.p, {
      children: "If you have existing content authored in MDX, this integration will hopefully make migrating to Astro a breeze."
    }), "\n", createVNode(_components.h2, {
      id: "example",
      children: "Example"
    }), "\n", createVNode(_components.p, {
      children: ["Here is how you import and use a UI component inside of MDX.", createVNode(_components.br, {}), "\nWhen you open this page in the browser, you should see the clickable button below."]
    }), "\n", "\n", createVNode($$HeaderLink, {
      href: "#",
      onclick: "alert('clicked!')",
      children: createVNode(_components.p, {
        children: "Embedded component in MDX"
      })
    }), "\n", createVNode(_components.h2, {
      id: "more-links",
      children: "More Links"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "https://mdxjs.com/docs/what-is-mdx",
          children: "MDX Syntax Documentation"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "https://docs.astro.build/en/guides/markdown-content/#markdown-and-mdx-pages",
          children: "Astro Usage Documentation"
        })
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Note:"
        }), " ", createVNode(_components.a, {
          href: "https://docs.astro.build/en/reference/directives-reference/#client-directives",
          children: "Client Directives"
        }), " are still required to create interactive components. Otherwise, all components in your MDX will render as static HTML (no JavaScript) by default."]
      }), "\n"]
    })]
  });
}
function MDXContent2(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent2, {
      ...props
    })
  }) : _createMdxContent2(props);
}
var frontmatter5, url5, file5, Content5;
var init_using_mdx_489f60b1 = __esm({
  "dist/server/chunks/using-mdx.489f60b1.mjs"() {
    "use strict";
    init_astro_1790c127();
    init_all_b9d9d6d3();
    frontmatter5 = {
      "title": "Using MDX",
      "description": "Lorem ipsum dolor sit amet",
      "pubDate": "Jul 02 2022",
      "heroImage": "/placeholder-hero.jpg"
    };
    __astro_tag_component__(getHeadings5, "astro:jsx");
    __astro_tag_component__(MDXContent2, "astro:jsx");
    url5 = "src/content/blog/using-mdx.mdx";
    file5 = "/home/jim/code/astro/prerender-deno/src/content/blog/using-mdx.mdx";
    Content5 = (props = {}) => MDXContent2({
      ...props,
      components: { Fragment, ...props.components }
    });
    Content5[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter5.layout);
  }
});

// dist/server/chunks/using-mdx.f549ec0b.mjs
var using_mdx_f549ec0b_exports = {};
__export(using_mdx_f549ec0b_exports, {
  collectedLinks: () => collectedLinks5,
  collectedScripts: () => collectedScripts5,
  collectedStyles: () => collectedStyles5,
  getMod: () => getMod5
});
async function getMod5() {
  return Promise.resolve().then(() => (init_using_mdx_489f60b1(), using_mdx_489f60b1_exports));
}
var collectedLinks5, collectedStyles5, collectedScripts5;
var init_using_mdx_f549ec0b = __esm({
  "dist/server/chunks/using-mdx.f549ec0b.mjs"() {
    "use strict";
    init_astro_1790c127();
    collectedLinks5 = ["/_astro/HeaderLink.astro_astro_type_style_index_0_lang.c3840210.css"];
    collectedStyles5 = "@@ASTRO-STYLES@@";
    collectedScripts5 = "@@ASTRO-SCRIPTS@@";
    __astro_tag_component__(getMod5, "astro:jsx");
  }
});

// dist/server/chunks/pages/all.b9d9d6d3.mjs
function getErrorMap() {
  return overrideErrorMap;
}
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap$1
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return ZodArray.create(deepPartialify(schema.element));
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
function mergeValues(a2, b) {
  const aType = getParsedType(a2);
  const bType = getParsedType(b);
  if (a2 === b) {
    return { valid: true, data: a2 };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util$3.objectKeys(b);
    const sharedKeys = util$3.objectKeys(a2).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a2, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a2[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a2.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a2.length; index++) {
      const itemA = a2[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a2 === +b) {
    return { valid: true, data: a2 };
  } else {
    return { valid: false };
  }
}
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
function isWhiteSpace(char) {
  return char === " " || char === "	" || char === "\n" || char === "\r";
}
function readPI(xmlData, i) {
  const start2 = i;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] == "?" || xmlData[i] == " ") {
      const tagname = xmlData.substr(start2, i - start2);
      if (i > 5 && tagname === "xml") {
        return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
      } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
        i++;
        break;
      } else {
        continue;
      }
    }
  }
  return i;
}
function readCommentAndCDATA(xmlData, i) {
  if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
    for (i += 3; i < xmlData.length; i++) {
      if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
        i += 2;
        break;
      }
    }
  } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
    let angleBracketsCount = 1;
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === "<") {
        angleBracketsCount++;
      } else if (xmlData[i] === ">") {
        angleBracketsCount--;
        if (angleBracketsCount === 0) {
          break;
        }
      }
    }
  } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
        i += 2;
        break;
      }
    }
  }
  return i;
}
function readAttributeStr(xmlData, i) {
  let attrStr = "";
  let startChar = "";
  let tagClosed = false;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
      if (startChar === "") {
        startChar = xmlData[i];
      } else if (startChar !== xmlData[i])
        ;
      else {
        startChar = "";
      }
    } else if (xmlData[i] === ">") {
      if (startChar === "") {
        tagClosed = true;
        break;
      }
    }
    attrStr += xmlData[i];
  }
  if (startChar !== "") {
    return false;
  }
  return {
    value: attrStr,
    index: i,
    tagClosed
  };
}
function validateAttributeString(attrStr, options) {
  const matches = util$1.getAllMatches(attrStr, validAttrStrRegxp);
  const attrNames = {};
  for (let i = 0; i < matches.length; i++) {
    if (matches[i][1].length === 0) {
      return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
    } else if (matches[i][3] !== void 0 && matches[i][4] === void 0) {
      return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
    } else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) {
      return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
    }
    const attrName = matches[i][2];
    if (!validateAttrName(attrName)) {
      return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
    }
    if (!attrNames.hasOwnProperty(attrName)) {
      attrNames[attrName] = 1;
    } else {
      return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
    }
  }
  return true;
}
function validateNumberAmpersand(xmlData, i) {
  let re = /\d/;
  if (xmlData[i] === "x") {
    i++;
    re = /[\da-fA-F]/;
  }
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === ";")
      return i;
    if (!xmlData[i].match(re))
      break;
  }
  return -1;
}
function validateAmpersand(xmlData, i) {
  i++;
  if (xmlData[i] === ";")
    return -1;
  if (xmlData[i] === "#") {
    i++;
    return validateNumberAmpersand(xmlData, i);
  }
  let count = 0;
  for (; i < xmlData.length; i++, count++) {
    if (xmlData[i].match(/\w/) && count < 20)
      continue;
    if (xmlData[i] === ";")
      break;
    return -1;
  }
  return i;
}
function getErrorObject(code, message, lineNumber) {
  return {
    err: {
      code,
      msg: message,
      line: lineNumber.line || lineNumber,
      col: lineNumber.col
    }
  };
}
function validateAttrName(attrName) {
  return util$1.isName(attrName);
}
function validateTagName(tagname) {
  return util$1.isName(tagname);
}
function getLineNumberForPosition(xmlData, index) {
  const lines = xmlData.substring(0, index).split(/\r?\n/);
  return {
    line: lines.length,
    col: lines[lines.length - 1].length + 1
  };
}
function getPositionFromMatch(match) {
  return match.startIndex + match[1].length;
}
function readDocType$1(xmlData, i) {
  const entities = {};
  if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
    i = i + 9;
    let angleBracketsCount = 1;
    let hasBody = false, entity = false, comment = false;
    let exp = "";
    for (; i < xmlData.length; i++) {
      if (xmlData[i] === "<" && !comment) {
        if (hasBody && xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "N" && xmlData[i + 4] === "T" && xmlData[i + 5] === "I" && xmlData[i + 6] === "T" && xmlData[i + 7] === "Y") {
          i += 7;
          entity = true;
        } else if (hasBody && xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "L" && xmlData[i + 4] === "E" && xmlData[i + 5] === "M" && xmlData[i + 6] === "E" && xmlData[i + 7] === "N" && xmlData[i + 8] === "T") {
          i += 8;
        } else if (hasBody && xmlData[i + 1] === "!" && xmlData[i + 2] === "A" && xmlData[i + 3] === "T" && xmlData[i + 4] === "T" && xmlData[i + 5] === "L" && xmlData[i + 6] === "I" && xmlData[i + 7] === "S" && xmlData[i + 8] === "T") {
          i += 8;
        } else if (hasBody && xmlData[i + 1] === "!" && xmlData[i + 2] === "N" && xmlData[i + 3] === "O" && xmlData[i + 4] === "T" && xmlData[i + 5] === "A" && xmlData[i + 6] === "T" && xmlData[i + 7] === "I" && xmlData[i + 8] === "O" && xmlData[i + 9] === "N") {
          i += 9;
        } else if (xmlData[i + 1] === "!" && xmlData[i + 2] === "-" && xmlData[i + 3] === "-") {
          comment = true;
        } else {
          throw new Error("Invalid DOCTYPE");
        }
        angleBracketsCount++;
        exp = "";
      } else if (xmlData[i] === ">") {
        if (comment) {
          if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
            comment = false;
            angleBracketsCount--;
          }
        } else {
          if (entity) {
            parseEntityExp(exp, entities);
            entity = false;
          }
          angleBracketsCount--;
        }
        if (angleBracketsCount === 0) {
          break;
        }
      } else if (xmlData[i] === "[") {
        hasBody = true;
      } else {
        exp += xmlData[i];
      }
    }
    if (angleBracketsCount !== 0) {
      throw new Error(`Unclosed DOCTYPE`);
    }
  } else {
    throw new Error(`Invalid Tag instead of DOCTYPE`);
  }
  return { entities, i };
}
function parseEntityExp(exp, entities) {
  const match = entityRegex.exec(exp);
  if (match) {
    entities[match[1]] = {
      regx: RegExp(`&${match[1]};`, "g"),
      val: match[3]
    };
  }
}
function toNumber$1(str, options = {}) {
  options = Object.assign({}, consider, options);
  if (!str || typeof str !== "string")
    return str;
  let trimmedStr = str.trim();
  if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr))
    return str;
  else if (options.hex && hexRegex.test(trimmedStr)) {
    return Number.parseInt(trimmedStr, 16);
  } else {
    const match = numRegex.exec(trimmedStr);
    if (match) {
      const sign = match[1];
      const leadingZeros = match[2];
      let numTrimmedByZeros = trimZeros(match[3]);
      const eNotation = match[4] || match[6];
      if (!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".")
        return str;
      else if (!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".")
        return str;
      else {
        const num = Number(trimmedStr);
        const numStr = "" + num;
        if (numStr.search(/[eE]/) !== -1) {
          if (options.eNotation)
            return num;
          else
            return str;
        } else if (eNotation) {
          if (options.eNotation)
            return num;
          else
            return str;
        } else if (trimmedStr.indexOf(".") !== -1) {
          if (numStr === "0" && numTrimmedByZeros === "")
            return num;
          else if (numStr === numTrimmedByZeros)
            return num;
          else if (sign && numStr === "-" + numTrimmedByZeros)
            return num;
          else
            return str;
        }
        if (leadingZeros) {
          if (numTrimmedByZeros === numStr)
            return num;
          else if (sign + numTrimmedByZeros === numStr)
            return num;
          else
            return str;
        }
        if (trimmedStr === numStr)
          return num;
        else if (trimmedStr === sign + numStr)
          return num;
        return str;
      }
    } else {
      return str;
    }
  }
}
function trimZeros(numStr) {
  if (numStr && numStr.indexOf(".") !== -1) {
    numStr = numStr.replace(/0+$/, "");
    if (numStr === ".")
      numStr = "0";
    else if (numStr[0] === ".")
      numStr = "0" + numStr;
    else if (numStr[numStr.length - 1] === ".")
      numStr = numStr.substr(0, numStr.length - 1);
    return numStr;
  }
  return numStr;
}
function addExternalEntities(externalEntities) {
  const entKeys = Object.keys(externalEntities);
  for (let i = 0; i < entKeys.length; i++) {
    const ent = entKeys[i];
    this.lastEntities[ent] = {
      regex: new RegExp("&" + ent + ";", "g"),
      val: externalEntities[ent]
    };
  }
}
function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
  if (val !== void 0) {
    if (this.options.trimValues && !dontTrim) {
      val = val.trim();
    }
    if (val.length > 0) {
      if (!escapeEntities)
        val = this.replaceEntitiesValue(val);
      const newval = this.options.tagValueProcessor(tagName, val, jPath, hasAttributes, isLeafNode);
      if (newval === null || newval === void 0) {
        return val;
      } else if (typeof newval !== typeof val || newval !== val) {
        return newval;
      } else if (this.options.trimValues) {
        return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
      } else {
        const trimmedVal = val.trim();
        if (trimmedVal === val) {
          return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
        } else {
          return val;
        }
      }
    }
  }
}
function resolveNameSpace(tagname) {
  if (this.options.removeNSPrefix) {
    const tags = tagname.split(":");
    const prefix = tagname.charAt(0) === "/" ? "/" : "";
    if (tags[0] === "xmlns") {
      return "";
    }
    if (tags.length === 2) {
      tagname = prefix + tags[1];
    }
  }
  return tagname;
}
function buildAttributesMap(attrStr, jPath) {
  if (!this.options.ignoreAttributes && typeof attrStr === "string") {
    const matches = util.getAllMatches(attrStr, attrsRegx);
    const len = matches.length;
    const attrs = {};
    for (let i = 0; i < len; i++) {
      const attrName = this.resolveNameSpace(matches[i][1]);
      let oldVal = matches[i][4];
      let aName = this.options.attributeNamePrefix + attrName;
      if (attrName.length) {
        if (this.options.transformAttributeName) {
          aName = this.options.transformAttributeName(aName);
        }
        if (aName === "__proto__")
          aName = "#__proto__";
        if (oldVal !== void 0) {
          if (this.options.trimValues) {
            oldVal = oldVal.trim();
          }
          oldVal = this.replaceEntitiesValue(oldVal);
          const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
          if (newVal === null || newVal === void 0) {
            attrs[aName] = oldVal;
          } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
            attrs[aName] = newVal;
          } else {
            attrs[aName] = parseValue(
              oldVal,
              this.options.parseAttributeValue,
              this.options.numberParseOptions
            );
          }
        } else if (this.options.allowBooleanAttributes) {
          attrs[aName] = true;
        }
      }
    }
    if (!Object.keys(attrs).length) {
      return;
    }
    if (this.options.attributesGroupName) {
      const attrCollection = {};
      attrCollection[this.options.attributesGroupName] = attrs;
      return attrCollection;
    }
    return attrs;
  }
}
function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
  if (textData) {
    if (isLeafNode === void 0)
      isLeafNode = Object.keys(currentNode.child).length === 0;
    textData = this.parseTextData(
      textData,
      currentNode.tagname,
      jPath,
      false,
      currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false,
      isLeafNode
    );
    if (textData !== void 0 && textData !== "")
      currentNode.add(this.options.textNodeName, textData);
    textData = "";
  }
  return textData;
}
function isItStopNode(stopNodes, jPath, currentTagName) {
  const allNodesExp = "*." + currentTagName;
  for (const stopNodePath in stopNodes) {
    const stopNodeExp = stopNodes[stopNodePath];
    if (allNodesExp === stopNodeExp || jPath === stopNodeExp)
      return true;
  }
  return false;
}
function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
  let attrBoundary;
  let tagExp = "";
  for (let index = i; index < xmlData.length; index++) {
    let ch = xmlData[index];
    if (attrBoundary) {
      if (ch === attrBoundary)
        attrBoundary = "";
    } else if (ch === '"' || ch === "'") {
      attrBoundary = ch;
    } else if (ch === closingChar[0]) {
      if (closingChar[1]) {
        if (xmlData[index + 1] === closingChar[1]) {
          return {
            data: tagExp,
            index
          };
        }
      } else {
        return {
          data: tagExp,
          index
        };
      }
    } else if (ch === "	") {
      ch = " ";
    }
    tagExp += ch;
  }
}
function findClosingIndex(xmlData, str, i, errMsg) {
  const closingIndex = xmlData.indexOf(str, i);
  if (closingIndex === -1) {
    throw new Error(errMsg);
  } else {
    return closingIndex + str.length - 1;
  }
}
function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
  const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
  if (!result)
    return;
  let tagExp = result.data;
  const closeIndex = result.index;
  const separatorIndex = tagExp.search(/\s/);
  let tagName = tagExp;
  let attrExpPresent = true;
  if (separatorIndex !== -1) {
    tagName = tagExp.substr(0, separatorIndex).replace(/\s\s*$/, "");
    tagExp = tagExp.substr(separatorIndex + 1);
  }
  if (removeNSPrefix) {
    const colonIndex = tagName.indexOf(":");
    if (colonIndex !== -1) {
      tagName = tagName.substr(colonIndex + 1);
      attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
    }
  }
  return {
    tagName,
    tagExp,
    closeIndex,
    attrExpPresent
  };
}
function readStopNodeData(xmlData, tagName, i) {
  const startIndex = i;
  let openTagCount = 1;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === "<") {
      if (xmlData[i + 1] === "/") {
        const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
        let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
        if (closeTagName === tagName) {
          openTagCount--;
          if (openTagCount === 0) {
            return {
              tagContent: xmlData.substring(startIndex, i),
              i: closeIndex
            };
          }
        }
        i = closeIndex;
      } else if (xmlData[i + 1] === "?") {
        const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
        i = closeIndex;
      } else if (xmlData.substr(i + 1, 3) === "!--") {
        const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
        i = closeIndex;
      } else if (xmlData.substr(i + 1, 2) === "![") {
        const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
        i = closeIndex;
      } else {
        const tagData = readTagExp(xmlData, i, ">");
        if (tagData) {
          const openTagName = tagData && tagData.tagName;
          if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
            openTagCount++;
          }
          i = tagData.closeIndex;
        }
      }
    }
  }
}
function parseValue(val, shouldParse, options) {
  if (shouldParse && typeof val === "string") {
    const newval = val.trim();
    if (newval === "true")
      return true;
    else if (newval === "false")
      return false;
    else
      return toNumber(val, options);
  } else {
    if (util.isExist(val)) {
      return val;
    } else {
      return "";
    }
  }
}
function prettify$1(node, options) {
  return compress(node, options);
}
function compress(arr, options, jPath) {
  let text;
  const compressedObj = {};
  for (let i = 0; i < arr.length; i++) {
    const tagObj = arr[i];
    const property = propName$1(tagObj);
    let newJpath = "";
    if (jPath === void 0)
      newJpath = property;
    else
      newJpath = jPath + "." + property;
    if (property === options.textNodeName) {
      if (text === void 0)
        text = tagObj[property];
      else
        text += "" + tagObj[property];
    } else if (property === void 0) {
      continue;
    } else if (tagObj[property]) {
      let val = compress(tagObj[property], options, newJpath);
      const isLeaf = isLeafTag(val, options);
      if (tagObj[":@"]) {
        assignAttributes(val, tagObj[":@"], newJpath, options);
      } else if (Object.keys(val).length === 1 && val[options.textNodeName] !== void 0 && !options.alwaysCreateTextNode) {
        val = val[options.textNodeName];
      } else if (Object.keys(val).length === 0) {
        if (options.alwaysCreateTextNode)
          val[options.textNodeName] = "";
        else
          val = "";
      }
      if (compressedObj[property] !== void 0 && compressedObj.hasOwnProperty(property)) {
        if (!Array.isArray(compressedObj[property])) {
          compressedObj[property] = [compressedObj[property]];
        }
        compressedObj[property].push(val);
      } else {
        if (options.isArray(property, newJpath, isLeaf)) {
          compressedObj[property] = [val];
        } else {
          compressedObj[property] = val;
        }
      }
    }
  }
  if (typeof text === "string") {
    if (text.length > 0)
      compressedObj[options.textNodeName] = text;
  } else if (text !== void 0)
    compressedObj[options.textNodeName] = text;
  return compressedObj;
}
function propName$1(obj) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key !== ":@")
      return key;
  }
}
function assignAttributes(obj, attrMap, jpath, options) {
  if (attrMap) {
    const keys = Object.keys(attrMap);
    const len = keys.length;
    for (let i = 0; i < len; i++) {
      const atrrName = keys[i];
      if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
        obj[atrrName] = [attrMap[atrrName]];
      } else {
        obj[atrrName] = attrMap[atrrName];
      }
    }
  }
}
function isLeafTag(obj, options) {
  const propCount = Object.keys(obj).length;
  if (propCount === 0 || propCount === 1 && obj[options.textNodeName])
    return true;
  return false;
}
function toXml(jArray, options) {
  let indentation = "";
  if (options.format && options.indentBy.length > 0) {
    indentation = EOL;
  }
  return arrToStr(jArray, options, "", indentation);
}
function arrToStr(arr, options, jPath, indentation) {
  let xmlStr = "";
  let isPreviousElementTag = false;
  for (let i = 0; i < arr.length; i++) {
    const tagObj = arr[i];
    const tagName = propName(tagObj);
    let newJPath = "";
    if (jPath.length === 0)
      newJPath = tagName;
    else
      newJPath = `${jPath}.${tagName}`;
    if (tagName === options.textNodeName) {
      let tagText = tagObj[tagName];
      if (!isStopNode(newJPath, options)) {
        tagText = options.tagValueProcessor(tagName, tagText);
        tagText = replaceEntitiesValue(tagText, options);
      }
      if (isPreviousElementTag) {
        xmlStr += indentation;
      }
      xmlStr += tagText;
      isPreviousElementTag = false;
      continue;
    } else if (tagName === options.cdataPropName) {
      if (isPreviousElementTag) {
        xmlStr += indentation;
      }
      xmlStr += `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
      isPreviousElementTag = false;
      continue;
    } else if (tagName === options.commentPropName) {
      xmlStr += indentation + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
      isPreviousElementTag = true;
      continue;
    } else if (tagName[0] === "?") {
      const attStr2 = attr_to_str(tagObj[":@"], options);
      const tempInd = tagName === "?xml" ? "" : indentation;
      let piTextNodeName = tagObj[tagName][0][options.textNodeName];
      piTextNodeName = piTextNodeName.length !== 0 ? " " + piTextNodeName : "";
      xmlStr += tempInd + `<${tagName}${piTextNodeName}${attStr2}?>`;
      isPreviousElementTag = true;
      continue;
    }
    let newIdentation = indentation;
    if (newIdentation !== "") {
      newIdentation += options.indentBy;
    }
    const attStr = attr_to_str(tagObj[":@"], options);
    const tagStart = indentation + `<${tagName}${attStr}`;
    const tagValue = arrToStr(tagObj[tagName], options, newJPath, newIdentation);
    if (options.unpairedTags.indexOf(tagName) !== -1) {
      if (options.suppressUnpairedNode)
        xmlStr += tagStart + ">";
      else
        xmlStr += tagStart + "/>";
    } else if ((!tagValue || tagValue.length === 0) && options.suppressEmptyNode) {
      xmlStr += tagStart + "/>";
    } else if (tagValue && tagValue.endsWith(">")) {
      xmlStr += tagStart + `>${tagValue}${indentation}</${tagName}>`;
    } else {
      xmlStr += tagStart + ">";
      if (tagValue && indentation !== "" && (tagValue.includes("/>") || tagValue.includes("</"))) {
        xmlStr += indentation + options.indentBy + tagValue + indentation;
      } else {
        xmlStr += tagValue;
      }
      xmlStr += `</${tagName}>`;
    }
    isPreviousElementTag = true;
  }
  return xmlStr;
}
function propName(obj) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key !== ":@")
      return key;
  }
}
function attr_to_str(attrMap, options) {
  let attrStr = "";
  if (attrMap && !options.ignoreAttributes) {
    for (let attr in attrMap) {
      let attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
      attrVal = replaceEntitiesValue(attrVal, options);
      if (attrVal === true && options.suppressBooleanAttributes) {
        attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
      } else {
        attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
      }
    }
  }
  return attrStr;
}
function isStopNode(jPath, options) {
  jPath = jPath.substr(0, jPath.length - options.textNodeName.length - 1);
  let tagName = jPath.substr(jPath.lastIndexOf(".") + 1);
  for (let index in options.stopNodes) {
    if (options.stopNodes[index] === jPath || options.stopNodes[index] === "*." + tagName)
      return true;
  }
  return false;
}
function replaceEntitiesValue(textValue, options) {
  if (textValue && textValue.length > 0 && options.processEntities) {
    for (let i = 0; i < options.entities.length; i++) {
      const entity = options.entities[i];
      textValue = textValue.replace(entity.regex, entity.val);
    }
  }
  return textValue;
}
function Builder(options) {
  this.options = Object.assign({}, defaultOptions, options);
  if (this.options.ignoreAttributes || this.options.attributesGroupName) {
    this.isAttribute = function() {
      return false;
    };
  } else {
    this.attrPrefixLen = this.options.attributeNamePrefix.length;
    this.isAttribute = isAttribute;
  }
  this.processTextOrObjNode = processTextOrObjNode;
  if (this.options.format) {
    this.indentate = indentate;
    this.tagEndChar = ">\n";
    this.newLine = "\n";
  } else {
    this.indentate = function() {
      return "";
    };
    this.tagEndChar = ">";
    this.newLine = "";
  }
}
function processTextOrObjNode(object, key, level) {
  const result = this.j2x(object, level + 1);
  if (object[this.options.textNodeName] !== void 0 && Object.keys(object).length === 1) {
    return this.buildTextValNode(object[this.options.textNodeName], key, result.attrStr, level);
  } else {
    return this.buildObjectNode(result.val, key, result.attrStr, level);
  }
}
function indentate(level) {
  return this.options.indentBy.repeat(level);
}
function isAttribute(name) {
  if (name.startsWith(this.options.attributeNamePrefix)) {
    return name.substr(this.attrPrefixLen);
  } else {
    return false;
  }
}
function createCanonicalURL(url6, base) {
  let pathname = url6.replace(/\/index.html$/, "");
  pathname = pathname.replace(/\/1\/?$/, "");
  if (!getUrlExtension(url6))
    pathname = pathname.replace(/(\/+)?$/, "/");
  pathname = pathname.replace(/\/+/g, "/");
  return new URL(pathname, base);
}
function isValidURL(url6) {
  try {
    new URL(url6);
    return true;
  } catch (e) {
  }
  return false;
}
function getUrlExtension(url6) {
  const lastDot = url6.lastIndexOf(".");
  const lastSlash = url6.lastIndexOf("/");
  return lastDot > lastSlash ? url6.slice(lastDot + 1) : "";
}
async function getRSS(rssOptions) {
  const validatedRssOptions = await validateRssOptions(rssOptions);
  return {
    body: await generateRSS(validatedRssOptions)
  };
}
async function validateRssOptions(rssOptions) {
  const parsedResult = await rssOptionsValidator.safeParseAsync(rssOptions, { errorMap });
  if (parsedResult.success) {
    return parsedResult.data;
  }
  const formattedError = new Error(
    [
      `[RSS] Invalid or missing options:`,
      ...parsedResult.error.errors.map(
        (zodError) => `${zodError.message} (${zodError.path.join(".")})`
      )
    ].join("\n")
  );
  throw formattedError;
}
function pagesGlobToRssItems(items) {
  return Promise.all(
    Object.entries(items).map(async ([filePath, getInfo]) => {
      const { url: url6, frontmatter: frontmatter6 } = await getInfo();
      if (url6 === void 0 || url6 === null) {
        throw new Error(
          `[RSS] You can only glob entries within 'src/pages/' when passing import.meta.glob() directly. Consider mapping the result to an array of RSSFeedItems. See the RSS docs for usage examples: https://docs.astro.build/en/guides/rss/#2-list-of-rss-feed-objects`
        );
      }
      const parsedResult = rssFeedItemValidator.safeParse(
        { ...frontmatter6, link: url6 },
        { errorMap }
      );
      if (parsedResult.success) {
        return parsedResult.data;
      }
      const formattedError = new Error(
        [
          `[RSS] ${filePath} has invalid or missing frontmatter.
Fix the following properties:`,
          ...parsedResult.error.errors.map((zodError) => zodError.message)
        ].join("\n")
      );
      formattedError.file = filePath;
      throw formattedError;
    })
  );
}
async function generateRSS(rssOptions) {
  var _a2;
  const { site } = rssOptions;
  const items = rssOptions.drafts ? rssOptions.items : rssOptions.items.filter((item) => !item.draft);
  const xmlOptions = { ignoreAttributes: false };
  const parser = new fxp.XMLParser(xmlOptions);
  const root = { "?xml": { "@_version": "1.0", "@_encoding": "UTF-8" } };
  if (typeof rssOptions.stylesheet === "string") {
    const isXSL = /\.xsl$/i.test(rssOptions.stylesheet);
    root["?xml-stylesheet"] = {
      "@_href": rssOptions.stylesheet,
      ...isXSL && { "@_type": "text/xsl" }
    };
  }
  root.rss = { "@_version": "2.0" };
  if (items.find((result) => result.content)) {
    const XMLContentNamespace = "http://purl.org/rss/1.0/modules/content/";
    root.rss["@_xmlns:content"] = XMLContentNamespace;
    if (((_a2 = rssOptions.xmlns) == null ? void 0 : _a2.content) && rssOptions.xmlns.content === XMLContentNamespace) {
      delete rssOptions.xmlns.content;
    }
  }
  if (rssOptions.xmlns) {
    for (const [k, v] of Object.entries(rssOptions.xmlns)) {
      root.rss[`@_xmlns:${k}`] = v;
    }
  }
  root.rss.channel = {
    title: rssOptions.title,
    description: rssOptions.description,
    link: createCanonicalURL(site).href
  };
  if (typeof rssOptions.customData === "string")
    Object.assign(
      root.rss.channel,
      parser.parse(`<channel>${rssOptions.customData}</channel>`).channel
    );
  root.rss.channel.item = items.map((result) => {
    const itemLink = isValidURL(result.link) ? result.link : createCanonicalURL(result.link, site).href;
    const item = {
      title: result.title,
      link: itemLink,
      guid: itemLink
    };
    if (result.description) {
      item.description = result.description;
    }
    if (result.pubDate) {
      item.pubDate = result.pubDate.toUTCString();
    }
    if (typeof result.content === "string") {
      item["content:encoded"] = result.content;
    }
    if (typeof result.customData === "string") {
      Object.assign(item, parser.parse(`<item>${result.customData}</item>`).item);
    }
    return item;
  });
  return new fxp.XMLBuilder(xmlOptions).build(root);
}
async function get(context) {
  const posts = await getCollection("blog");
  return getRSS({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`
    }))
  });
}
var $$Astro$6, $$BaseHead, $$Astro$5, $$HeaderLink, SITE_TITLE, SITE_DESCRIPTION, $$Astro$4, $$Header, $$Astro$3, $$Footer, $$Astro$2, $$Index$1, $$file$1, $$url$1, _page0, util$3, ZodParsedType, getParsedType, ZodIssueCode, ZodError, errorMap$1, overrideErrorMap, makeIssue, ParseStatus, INVALID, DIRTY, OK, isAborted, isDirty, isValid, isAsync, errorUtil, ParseInputLazyPath, handleResult, ZodType, cuidRegex, cuid2Regex, uuidRegex, emailRegex, datetimeRegex, ZodString, ZodNumber, ZodBigInt, ZodBoolean, ZodDate, ZodSymbol, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodArray, objectUtil, ZodObject, ZodUnion, getDiscriminator, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodFunction, ZodLazy, ZodLiteral, ZodEnum, ZodNativeEnum, ZodPromise, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodCatch, ZodNaN, ZodBranded, ZodPipeline, ZodFirstPartyTypeKind, stringType, numberType, booleanType, dateType, anyType, arrayType, objectType, unionType, recordType, functionType, promiseType, preprocessType, validator$2, util$2, util$1, defaultOptions$2, doubleQuote, singleQuote, validAttrStrRegxp, OptionsBuilder, defaultOptions$1, buildOptions$1, XmlNode, xmlNode$1, entityRegex, DocTypeReader, hexRegex, numRegex, consider, strnum, util, xmlNode, readDocType, toNumber, OrderedObjParser$1, attrsRegx, parseXml, replaceEntitiesValue$1, OrderedObjParser_1, node2json, buildOptions, OrderedObjParser2, prettify, validator$1, XMLParser$1, XMLParser_1, EOL, orderedJs2Xml, buildFromOrderedJs, defaultOptions, json2xml, validator, XMLParser2, XMLBuilder, fxp, rssSchema, flattenErrorPath, errorMap, rssFeedItemValidator, globResultValidator, rssOptionsValidator, contentDir, entryGlob, collectionToEntryMap, renderEntryGlob, collectionToRenderEntryMap, getCollection, _page1, $$Astro$1, $$FormattedDate, $$Astro, $$Index, $$file, $$url, _page3;
var init_all_b9d9d6d3 = __esm({
  "dist/server/chunks/pages/all.b9d9d6d3.mjs"() {
    "use strict";
    init_astro_1790c127();
    $$Astro$6 = createAstro("https://example.com");
    $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
      Astro2.self = $$BaseHead;
      const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
      const { title, description, image = "/placeholder-social.jpg" } = Astro2.props;
      return renderTemplate`<!-- Global Metadata --><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="generator"${addAttribute(Astro2.generator, "content")}>

<!-- Canonical URL -->
<link rel="canonical"${addAttribute(canonicalURL, "href")}>

<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title"${addAttribute(title, "content")}>
<meta name="description"${addAttribute(description, "content")}>

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url"${addAttribute(Astro2.url, "content")}>
<meta property="og:title"${addAttribute(title, "content")}>
<meta property="og:description"${addAttribute(description, "content")}>
<meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}>

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url"${addAttribute(Astro2.url, "content")}>
<meta property="twitter:title"${addAttribute(title, "content")}>
<meta property="twitter:description"${addAttribute(description, "content")}>
<meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}>`;
    }, "/home/jim/code/astro/prerender-deno/src/components/BaseHead.astro");
    $$Astro$5 = createAstro("https://example.com");
    $$HeaderLink = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
      Astro2.self = $$HeaderLink;
      const { href, class: className, ...props } = Astro2.props;
      const { pathname } = Astro2.url;
      const isActive = href === pathname || href === pathname.replace(/\/$/, "");
      return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute([[className, { active: isActive }], "astro-EIMMU3LG"], "class:list")}${spreadAttributes(props)}>
	${renderSlot($$result, $$slots["default"])}
</a>`;
    }, "/home/jim/code/astro/prerender-deno/src/components/HeaderLink.astro");
    SITE_TITLE = "My personal website.";
    SITE_DESCRIPTION = "Welcome to my website!";
    $$Astro$4 = createAstro("https://example.com");
    $$Header = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
      Astro2.self = $$Header;
      return renderTemplate`${maybeRenderHead($$result)}<header class="astro-3EF6KSR2">
	<h2 class="astro-3EF6KSR2">
		${SITE_TITLE}
	</h2>
	<nav class="astro-3EF6KSR2">
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/", "class": "astro-3EF6KSR2" }, { "default": ($$result2) => renderTemplate`Home` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/blog", "class": "astro-3EF6KSR2" }, { "default": ($$result2) => renderTemplate`Blog` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/about", "class": "astro-3EF6KSR2" }, { "default": ($$result2) => renderTemplate`About` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "https://twitter.com/astrodotbuild", "target": "_blank", "class": "astro-3EF6KSR2" }, { "default": ($$result2) => renderTemplate`Twitter` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "https://github.com/withastro/astro", "target": "_blank", "class": "astro-3EF6KSR2" }, { "default": ($$result2) => renderTemplate`GitHub` })}
	</nav>
</header>`;
    }, "/home/jim/code/astro/prerender-deno/src/components/Header.astro");
    $$Astro$3 = createAstro("https://example.com");
    $$Footer = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
      Astro2.self = $$Footer;
      const today = new Date();
      return renderTemplate`${maybeRenderHead($$result)}<footer class="astro-SZ7XMLTE">
	&copy; ${today.getFullYear()} YOUR NAME HERE. All rights reserved.
</footer>`;
    }, "/home/jim/code/astro/prerender-deno/src/components/Footer.astro");
    $$Astro$2 = createAstro("https://example.com");
    $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
      Astro2.self = $$Index$1;
      return renderTemplate`<html lang="en">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}
	${renderHead($$result)}</head>
	<body>
		${renderComponent($$result, "Header", $$Header, { "title": SITE_TITLE })}
		<main>
			<h1>🧑‍🚀 Hello, Astronaut!</h1>
			<p>
				Welcome to the official <a href="https://astro.build/">Astro</a> blog starter template. This
				template serves as a lightweight, minimally-styled starting point for anyone looking to build
				a personal website, blog, or portfolio with Astro.
			</p>
			<p>
				This template comes with a few integrations already configured in your
				<code>astro.config.mjs</code> file. You can customize your setup with
				<a href="https://astro.build/integrations">Astro Integrations</a> to add tools like Tailwind,
				React, or Vue to your project.
			</p>
			<p>Here are a few ideas on how to get started with the template:</p>
			<ul>
				<li>Edit this page in <code>src/pages/index.astro</code></li>
				<li>Edit the site header items in <code>src/components/Header.astro</code></li>
				<li>Add your name to the footer in <code>src/components/Footer.astro</code></li>
				<li>Check out the included blog posts in <code>src/pages/blog/</code></li>
				<li>Customize the blog post page layout in <code>src/layouts/BlogPost.astro</code></li>
			</ul>
			<p>
				Have fun! If you get stuck, remember to <a href="https://docs.astro.build/">read the docs
				</a> or <a href="https://astro.build/chat">join us on Discord</a> to ask questions.
			</p>
			<p>
				Looking for a blog template with a bit more personality? Check out <a href="https://github.com/Charca/astro-blog-template">astro-blog-template
				</a> by <a href="https://twitter.com/Charca">Maxi Ferreira</a>.
			</p>
		</main>
		${renderComponent($$result, "Footer", $$Footer, {})}
	</body></html>`;
    }, "/home/jim/code/astro/prerender-deno/src/pages/index.astro");
    $$file$1 = "/home/jim/code/astro/prerender-deno/src/pages/index.astro";
    $$url$1 = "";
    _page0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: $$Index$1,
      file: $$file$1,
      url: $$url$1
    }, Symbol.toStringTag, { value: "Module" }));
    (function(util2) {
      util2.assertEqual = (val) => val;
      function assertIs(_arg) {
      }
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
      function joinValues(array, separator = " | ") {
        return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_2, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util$3 || (util$3 = {}));
    ZodParsedType = util$3.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    getParsedType = (data6) => {
      const t = typeof data6;
      switch (t) {
        case "undefined":
          return ZodParsedType.undefined;
        case "string":
          return ZodParsedType.string;
        case "number":
          return isNaN(data6) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
          return ZodParsedType.boolean;
        case "function":
          return ZodParsedType.function;
        case "bigint":
          return ZodParsedType.bigint;
        case "symbol":
          return ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data6)) {
            return ZodParsedType.array;
          }
          if (data6 === null) {
            return ZodParsedType.null;
          }
          if (data6.then && typeof data6.then === "function" && data6.catch && typeof data6.catch === "function") {
            return ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data6 instanceof Map) {
            return ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data6 instanceof Set) {
            return ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data6 instanceof Date) {
            return ZodParsedType.date;
          }
          return ZodParsedType.object;
        default:
          return ZodParsedType.unknown;
      }
    };
    ZodIssueCode = util$3.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    ZodError = class extends Error {
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      get errors() {
        return this.issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = (error2) => {
          for (const issue of error2.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util$3.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    ZodError.create = (issues) => {
      const error2 = new ZodError(issues);
      return error2;
    };
    errorMap$1 = (issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodIssueCode.invalid_type:
          if (issue.received === ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util$3.jsonStringifyReplacer)}`;
          break;
        case ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util$3.joinValues(issue.keys, ", ")}`;
          break;
        case ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util$3.joinValues(issue.options)}`;
          break;
        case ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util$3.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util$3.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(issue.minimum)}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(issue.maximum)}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util$3.assertNever(issue);
      }
      return { message };
    };
    overrideErrorMap = errorMap$1;
    makeIssue = (params) => {
      const { data: data6, path, errorMaps, issueData } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data: data6, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: issueData.message || errorMessage
      };
    };
    ParseStatus = class {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
          if (s.status === "aborted")
            return INVALID;
          if (s.status === "dirty")
            status.dirty();
          arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          syncPairs.push({
            key: await pair.key,
            value: await pair.value
          });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key, value } = pair;
          if (key.status === "aborted")
            return INVALID;
          if (value.status === "aborted")
            return INVALID;
          if (key.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (typeof value.value !== "undefined" || pair.alwaysSet) {
            finalObject[key.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    INVALID = Object.freeze({
      status: "aborted"
    });
    DIRTY = (value) => ({ status: "dirty", value });
    OK = (value) => ({ status: "valid", value });
    isAborted = (x) => x.status === "aborted";
    isDirty = (x) => x.status === "dirty";
    isValid = (x) => x.status === "valid";
    isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
    (function(errorUtil2) {
      errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
    })(errorUtil || (errorUtil = {}));
    ParseInputLazyPath = class {
      constructor(parent, value, path, key) {
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
      }
      get path() {
        return this._path.concat(this._key);
      }
    };
    handleResult = (ctx, result) => {
      if (isValid(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        const error2 = new ZodError(ctx.common.issues);
        return { success: false, error: error2 };
      }
    };
    ZodType = class {
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
      }
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return getParsedType(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data6, params) {
        const result = this.safeParse(data6, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data6, params) {
        var _a2;
        const ctx = {
          common: {
            issues: [],
            async: (_a2 = params === null || params === void 0 ? void 0 : params.async) !== null && _a2 !== void 0 ? _a2 : false,
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: data6,
          parsedType: getParsedType(data6)
        };
        const result = this._parseSync({ data: data6, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
      }
      async parseAsync(data6, params) {
        const result = await this.safeParseAsync(data6, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data6, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            async: true
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: data6,
          parsedType: getParsedType(data6)
        };
        const maybeAsyncResult = this._parse({ data: data6, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
      }
      refine(check2, message) {
        const getIssueProperties = (val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check2(val);
          const setError = () => ctx.addIssue({
            code: ZodIssueCode.custom,
            ...getIssueProperties(val)
          });
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data6) => {
              if (!data6) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check2, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check2(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      optional() {
        return ZodOptional.create(this, this._def);
      }
      nullable() {
        return ZodNullable.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray.create(this, this._def);
      }
      promise() {
        return ZodPromise.create(this, this._def);
      }
      or(option) {
        return ZodUnion.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects({
          ...processCreateParams(this._def),
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
          ...processCreateParams(this._def),
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        });
      }
      brand() {
        return new ZodBranded({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this,
          ...processCreateParams(this._def)
        });
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
          ...processCreateParams(this._def),
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    cuidRegex = /^c[^\s-]{8,}$/i;
    cuid2Regex = /^[a-z][a-z0-9]*$/;
    uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
    emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|([^-]([a-zA-Z0-9-]*\.)+[a-zA-Z]{2,}))$/;
    datetimeRegex = (args) => {
      if (args.precision) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
        }
      } else if (args.precision === 0) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
        }
      } else {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
        }
      }
    };
    ZodString = class extends ZodType {
      constructor() {
        super(...arguments);
        this._regex = (regex, validation, message) => this.refinement((data6) => regex.test(data6), {
          validation,
          code: ZodIssueCode.invalid_string,
          ...errorUtil.errToObj(message)
        });
        this.nonempty = (message) => this.min(1, errorUtil.errToObj(message));
        this.trim = () => new ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(
            ctx2,
            {
              code: ZodIssueCode.invalid_type,
              expected: ZodParsedType.string,
              received: ctx2.parsedType
            }
          );
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check2 of this._def.checks) {
          if (check2.kind === "min") {
            if (input.data.length < check2.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check2.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "max") {
            if (input.data.length > check2.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check2.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "length") {
            const tooBig = input.data.length > check2.value;
            const tooSmall = input.data.length < check2.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_big,
                  maximum: check2.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check2.message
                });
              } else if (tooSmall) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_small,
                  minimum: check2.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check2.message
                });
              }
              status.dirty();
            }
          } else if (check2.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "email",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "uuid",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "cuid2") {
            if (!cuid2Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid2",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "url") {
            try {
              new URL(input.data);
            } catch (_a2) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "url",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "regex") {
            check2.regex.lastIndex = 0;
            const testResult = check2.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "regex",
                code: ZodIssueCode.invalid_string,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "trim") {
            input.data = input.data.trim();
          } else if (check2.kind === "startsWith") {
            if (!input.data.startsWith(check2.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { startsWith: check2.value },
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "endsWith") {
            if (!input.data.endsWith(check2.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { endsWith: check2.value },
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "datetime") {
            const regex = datetimeRegex(check2);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check2.message
              });
              status.dirty();
            }
          } else {
            util$3.assertNever(check2);
          }
        }
        return { status: status.value, value: input.data };
      }
      _addCheck(check2) {
        return new ZodString({
          ...this._def,
          checks: [...this._def.checks, check2]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
      }
      cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
      }
      datetime(options) {
        var _a2;
        if (typeof options === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            message: options
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
          offset: (_a2 = options === null || options === void 0 ? void 0 : options.offset) !== null && _a2 !== void 0 ? _a2 : false,
          ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
        });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil.errToObj(message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil.errToObj(message)
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodString.create = (params) => {
      var _a2;
      return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a2 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a2 !== void 0 ? _a2 : false,
        ...processCreateParams(params)
      });
    };
    ZodNumber = class extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.number,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check2 of this._def.checks) {
          if (check2.kind === "int") {
            if (!util$3.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "min") {
            const tooSmall = check2.inclusive ? input.data < check2.value : input.data <= check2.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check2.value,
                type: "number",
                inclusive: check2.inclusive,
                exact: false,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "max") {
            const tooBig = check2.inclusive ? input.data > check2.value : input.data >= check2.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check2.value,
                type: "number",
                inclusive: check2.inclusive,
                exact: false,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check2.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check2.value,
                message: check2.message
              });
              status.dirty();
            }
          } else if (check2.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_finite,
                message: check2.message
              });
              status.dirty();
            }
          } else {
            util$3.assertNever(check2);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check2) {
        return new ZodNumber({
          ...this._def,
          checks: [...this._def.checks, check2]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util$3.isInteger(ch.value));
      }
      get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    };
    ZodNumber.create = (params) => {
      return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodBigInt = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.bigint,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodBigInt.create = (params) => {
      var _a2;
      return new ZodBigInt({
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a2 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a2 !== void 0 ? _a2 : false,
        ...processCreateParams(params)
      });
    };
    ZodBoolean = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodBoolean.create = (params) => {
      return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodDate = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.date,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        if (isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_date
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check2 of this._def.checks) {
          if (check2.kind === "min") {
            if (input.data.getTime() < check2.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                message: check2.message,
                inclusive: true,
                exact: false,
                minimum: check2.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check2.kind === "max") {
            if (input.data.getTime() > check2.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                message: check2.message,
                inclusive: true,
                exact: false,
                maximum: check2.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util$3.assertNever(check2);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check2) {
        return new ZodDate({
          ...this._def,
          checks: [...this._def.checks, check2]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    ZodDate.create = (params) => {
      return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
      });
    };
    ZodSymbol = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodSymbol.create = (params) => {
      return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
      });
    };
    ZodUndefined = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodUndefined.create = (params) => {
      return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
      });
    };
    ZodNull = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.null,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodNull.create = (params) => {
      return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
      });
    };
    ZodAny = class extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodAny.create = (params) => {
      return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
      });
    };
    ZodUnknown = class extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodUnknown.create = (params) => {
      return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
      });
    };
    ZodNever = class extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.never,
          received: ctx.parsedType
        });
        return INVALID;
      }
    };
    ZodNever.create = (params) => {
      return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
      });
    };
    ZodVoid = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.void,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodVoid.create = (params) => {
      return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
      });
    };
    ZodArray = class extends ZodType {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            addIssueToContext(ctx, {
              code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
          })).then((result2) => {
            return ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new ZodArray({
          ...this._def,
          minLength: { value: minLength, message: errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new ZodArray({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new ZodArray({
          ...this._def,
          exactLength: { value: len, message: errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodArray.create = (schema, params) => {
      return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
      });
    };
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
        };
      };
    })(objectUtil || (objectUtil = {}));
    ZodObject = class extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util$3.objectKeys(shape);
        return this._cached = { shape, keys };
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key in ctx.data) {
            if (!shapeKeys.includes(key)) {
              extraKeys.push(key);
            }
          }
        }
        const pairs = [];
        for (const key of shapeKeys) {
          const keyValidator = shape[key];
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key },
                value: { status: "valid", value: ctx.data[key] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip")
            ;
          else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key of extraKeys) {
            const value = ctx.data[key];
            pairs.push({
              key: { status: "valid", value: key },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key)
              ),
              alwaysSet: key in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key = await pair.key;
              syncPairs.push({
                key,
                value: await pair.value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil.errToObj;
        return new ZodObject({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: (issue, ctx) => {
              var _a2, _b, _c, _d;
              const defaultError = (_c = (_b = (_a2 = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a2, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new ZodObject({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new ZodObject({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      extend(augmentation) {
        return new ZodObject({
          ...this._def,
          shape: () => ({
            ...this._def.shape(),
            ...augmentation
          })
        });
      }
      merge(merging) {
        const merged = new ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      setKey(key, schema) {
        return this.augment({ [key]: schema });
      }
      catchall(index) {
        return new ZodObject({
          ...this._def,
          catchall: index
        });
      }
      pick(mask) {
        const shape = {};
        util$3.objectKeys(mask).forEach((key) => {
          if (mask[key] && this.shape[key]) {
            shape[key] = this.shape[key];
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        util$3.objectKeys(this.shape).forEach((key) => {
          if (!mask[key]) {
            shape[key] = this.shape[key];
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        util$3.objectKeys(this.shape).forEach((key) => {
          const fieldSchema = this.shape[key];
          if (mask && !mask[key]) {
            newShape[key] = fieldSchema;
          } else {
            newShape[key] = fieldSchema.optional();
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        util$3.objectKeys(this.shape).forEach((key) => {
          if (mask && !mask[key]) {
            newShape[key] = this.shape[key];
          } else {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key] = newField;
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum(util$3.objectKeys(this.shape));
      }
    };
    ZodObject.create = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError(issues2));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    ZodUnion.create = (types, params) => {
      return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
      });
    };
    getDiscriminator = (type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return Object.keys(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else {
        return null;
      }
    };
    ZodDiscriminatedUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      static create(discriminator, options, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new ZodDiscriminatedUnion({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options,
          optionsMap,
          ...processCreateParams(params)
        });
      }
    };
    ZodIntersection = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if (isAborted(parsedLeft) || isAborted(parsedRight)) {
            return INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_intersection_types
            });
            return INVALID;
          }
          if (isDirty(parsedLeft) || isDirty(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
      });
    };
    ZodTuple = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema)
            return null;
          return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return ParseStatus.mergeArray(status, results);
          });
        } else {
          return ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new ZodTuple({
          ...this._def,
          rest
        });
      }
    };
    ZodTuple.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
      });
    };
    ZodRecord = class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
          });
        }
        if (ctx.common.async) {
          return ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new ZodRecord({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(third)
          });
        }
        return new ZodRecord({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(second)
        });
      }
    };
    ZodMap = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.map,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key = pair.key;
            const value = pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
      });
    };
    ZodSet = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.set,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new ZodSet({
          ...this._def,
          minSize: { value: minSize, message: errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new ZodSet({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodSet.create = (valueType, params) => {
      return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
      });
    };
    ZodFunction = class extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.function,
            received: ctx.parsedType
          });
          return INVALID;
        }
        function makeArgsIssue(args, error2) {
          return makeIssue({
            data: args,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap$1
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_arguments,
              argumentsError: error2
            }
          });
        }
        function makeReturnsIssue(returns, error2) {
          return makeIssue({
            data: returns,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap$1
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_return_type,
              returnTypeError: error2
            }
          });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          return OK(async (...args) => {
            const error2 = new ZodError([]);
            const parsedArgs = await this._def.args.parseAsync(args, params).catch((e) => {
              error2.addIssue(makeArgsIssue(args, e));
              throw error2;
            });
            const result = await fn(...parsedArgs);
            const parsedReturns = await this._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error2.addIssue(makeReturnsIssue(result, e));
              throw error2;
            });
            return parsedReturns;
          });
        } else {
          return OK((...args) => {
            const parsedArgs = this._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = fn(...parsedArgs.data);
            const parsedReturns = this._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new ZodFunction({
          ...this._def,
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
      }
      returns(returnType) {
        return new ZodFunction({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new ZodFunction({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction,
          ...processCreateParams(params)
        });
      }
    };
    ZodLazy = class extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    ZodLazy.create = (getter, params) => {
      return new ZodLazy({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
      });
    };
    ZodLiteral = class extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
      });
    };
    ZodEnum = class extends ZodType {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            expected: util$3.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (this._def.values.indexOf(input.data) === -1) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values) {
        return ZodEnum.create(values);
      }
      exclude(values) {
        return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
      }
    };
    ZodEnum.create = createZodEnum;
    ZodNativeEnum = class extends ZodType {
      _parse(input) {
        const nativeEnumValues = util$3.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
          const expectedValues = util$3.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            expected: util$3.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (nativeEnumValues.indexOf(input.data) === -1) {
          const expectedValues = util$3.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
      });
    };
    ZodPromise = class extends ZodType {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.promise,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data6) => {
          return this._def.type.parseAsync(data6, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    ZodPromise.create = (schema, params) => {
      return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
      });
    };
    ZodEffects = class extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data);
          if (ctx.common.async) {
            return Promise.resolve(processed).then((processed2) => {
              return this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
            });
          } else {
            return this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
          }
        }
        const checkCtx = {
          addIssue: (arg) => {
            addIssueToContext(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!isValid(base))
              return base;
            const result = effect.transform(base.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
              if (!isValid(base))
                return base;
              return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
            });
          }
        }
        util$3.assertNever(effect);
      }
    };
    ZodEffects.create = (schema, effect, params) => {
      return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params)
      });
    };
    ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
      });
    };
    ZodOptional = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
          return OK(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodOptional.create = (type, params) => {
      return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
      });
    };
    ZodNullable = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
          return OK(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodNullable.create = (type, params) => {
      return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
      });
    };
    ZodDefault = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data6 = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
          data6 = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data: data6,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    ZodDefault.create = (type, params) => {
      return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    ZodCatch = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const result = this._def.innerType._parse({
          data: ctx.data,
          path: ctx.path,
          parent: {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            }
          }
        });
        if (isAsync(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue()
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue()
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    };
    ZodCatch.create = (type, params) => {
      return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params)
      });
    };
    ZodNaN = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.nan,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    ZodNaN.create = (params) => {
      return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
      });
    };
    ZodBranded = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data6 = ctx.data;
        return this._def.type._parse({
          data: data6,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    ZodPipeline = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return DIRTY(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          };
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a2, b) {
        return new ZodPipeline({
          in: a2,
          out: b,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    };
    ({
      object: ZodObject.lazycreate
    });
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
    })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
    stringType = ZodString.create;
    numberType = ZodNumber.create;
    ZodNaN.create;
    ZodBigInt.create;
    booleanType = ZodBoolean.create;
    dateType = ZodDate.create;
    ZodSymbol.create;
    ZodUndefined.create;
    ZodNull.create;
    anyType = ZodAny.create;
    ZodUnknown.create;
    ZodNever.create;
    ZodVoid.create;
    arrayType = ZodArray.create;
    objectType = ZodObject.create;
    ZodObject.strictCreate;
    unionType = ZodUnion.create;
    ZodDiscriminatedUnion.create;
    ZodIntersection.create;
    ZodTuple.create;
    recordType = ZodRecord.create;
    ZodMap.create;
    ZodSet.create;
    functionType = ZodFunction.create;
    ZodLazy.create;
    ZodLiteral.create;
    ZodEnum.create;
    ZodNativeEnum.create;
    promiseType = ZodPromise.create;
    ZodEffects.create;
    ZodOptional.create;
    ZodNullable.create;
    preprocessType = ZodEffects.createWithPreprocess;
    ZodPipeline.create;
    validator$2 = {};
    util$2 = {};
    (function(exports) {
      const nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
      const nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
      const nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
      const regexName = new RegExp("^" + nameRegexp + "$");
      const getAllMatches = function(string, regex) {
        const matches = [];
        let match = regex.exec(string);
        while (match) {
          const allmatches = [];
          allmatches.startIndex = regex.lastIndex - match[0].length;
          const len = match.length;
          for (let index = 0; index < len; index++) {
            allmatches.push(match[index]);
          }
          matches.push(allmatches);
          match = regex.exec(string);
        }
        return matches;
      };
      const isName = function(string) {
        const match = regexName.exec(string);
        return !(match === null || typeof match === "undefined");
      };
      exports.isExist = function(v) {
        return typeof v !== "undefined";
      };
      exports.isEmptyObject = function(obj) {
        return Object.keys(obj).length === 0;
      };
      exports.merge = function(target, a2, arrayMode) {
        if (a2) {
          const keys = Object.keys(a2);
          const len = keys.length;
          for (let i = 0; i < len; i++) {
            if (arrayMode === "strict") {
              target[keys[i]] = [a2[keys[i]]];
            } else {
              target[keys[i]] = a2[keys[i]];
            }
          }
        }
      };
      exports.getValue = function(v) {
        if (exports.isExist(v)) {
          return v;
        } else {
          return "";
        }
      };
      exports.isName = isName;
      exports.getAllMatches = getAllMatches;
      exports.nameRegexp = nameRegexp;
    })(util$2);
    util$1 = util$2;
    defaultOptions$2 = {
      allowBooleanAttributes: false,
      unpairedTags: []
    };
    validator$2.validate = function(xmlData, options) {
      options = Object.assign({}, defaultOptions$2, options);
      const tags = [];
      let tagFound = false;
      let reachedRoot = false;
      if (xmlData[0] === "\uFEFF") {
        xmlData = xmlData.substr(1);
      }
      for (let i = 0; i < xmlData.length; i++) {
        if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
          i += 2;
          i = readPI(xmlData, i);
          if (i.err)
            return i;
        } else if (xmlData[i] === "<") {
          let tagStartPos = i;
          i++;
          if (xmlData[i] === "!") {
            i = readCommentAndCDATA(xmlData, i);
            continue;
          } else {
            let closingTag = false;
            if (xmlData[i] === "/") {
              closingTag = true;
              i++;
            }
            let tagName = "";
            for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) {
              tagName += xmlData[i];
            }
            tagName = tagName.trim();
            if (tagName[tagName.length - 1] === "/") {
              tagName = tagName.substring(0, tagName.length - 1);
              i--;
            }
            if (!validateTagName(tagName)) {
              let msg;
              if (tagName.trim().length === 0) {
                msg = "Invalid space after '<'.";
              } else {
                msg = "Tag '" + tagName + "' is an invalid name.";
              }
              return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
            }
            const result = readAttributeStr(xmlData, i);
            if (result === false) {
              return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
            }
            let attrStr = result.value;
            i = result.index;
            if (attrStr[attrStr.length - 1] === "/") {
              const attrStrStart = i - attrStr.length;
              attrStr = attrStr.substring(0, attrStr.length - 1);
              const isValid2 = validateAttributeString(attrStr, options);
              if (isValid2 === true) {
                tagFound = true;
              } else {
                return getErrorObject(isValid2.err.code, isValid2.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid2.err.line));
              }
            } else if (closingTag) {
              if (!result.tagClosed) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
              } else if (attrStr.trim().length > 0) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
              } else {
                const otg = tags.pop();
                if (tagName !== otg.tagName) {
                  let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                  return getErrorObject(
                    "InvalidTag",
                    "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.",
                    getLineNumberForPosition(xmlData, tagStartPos)
                  );
                }
                if (tags.length == 0) {
                  reachedRoot = true;
                }
              }
            } else {
              const isValid2 = validateAttributeString(attrStr, options);
              if (isValid2 !== true) {
                return getErrorObject(isValid2.err.code, isValid2.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid2.err.line));
              }
              if (reachedRoot === true) {
                return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
              } else if (options.unpairedTags.indexOf(tagName) !== -1)
                ;
              else {
                tags.push({ tagName, tagStartPos });
              }
              tagFound = true;
            }
            for (i++; i < xmlData.length; i++) {
              if (xmlData[i] === "<") {
                if (xmlData[i + 1] === "!") {
                  i++;
                  i = readCommentAndCDATA(xmlData, i);
                  continue;
                } else if (xmlData[i + 1] === "?") {
                  i = readPI(xmlData, ++i);
                  if (i.err)
                    return i;
                } else {
                  break;
                }
              } else if (xmlData[i] === "&") {
                const afterAmp = validateAmpersand(xmlData, i);
                if (afterAmp == -1)
                  return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
                i = afterAmp;
              } else {
                if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
                  return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
                }
              }
            }
            if (xmlData[i] === "<") {
              i--;
            }
          }
        } else {
          if (isWhiteSpace(xmlData[i])) {
            continue;
          }
          return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
        }
      }
      if (!tagFound) {
        return getErrorObject("InvalidXml", "Start tag expected.", 1);
      } else if (tags.length == 1) {
        return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
      } else if (tags.length > 0) {
        return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
      }
      return true;
    };
    doubleQuote = '"';
    singleQuote = "'";
    validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
    OptionsBuilder = {};
    defaultOptions$1 = {
      preserveOrder: false,
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      removeNSPrefix: false,
      allowBooleanAttributes: false,
      parseTagValue: true,
      parseAttributeValue: false,
      trimValues: true,
      cdataPropName: false,
      numberParseOptions: {
        hex: true,
        leadingZeros: true,
        eNotation: true
      },
      tagValueProcessor: function(tagName, val) {
        return val;
      },
      attributeValueProcessor: function(attrName, val) {
        return val;
      },
      stopNodes: [],
      alwaysCreateTextNode: false,
      isArray: () => false,
      commentPropName: false,
      unpairedTags: [],
      processEntities: true,
      htmlEntities: false,
      ignoreDeclaration: false,
      ignorePiTags: false,
      transformTagName: false,
      transformAttributeName: false
    };
    buildOptions$1 = function(options) {
      return Object.assign({}, defaultOptions$1, options);
    };
    OptionsBuilder.buildOptions = buildOptions$1;
    OptionsBuilder.defaultOptions = defaultOptions$1;
    XmlNode = class {
      constructor(tagname) {
        this.tagname = tagname;
        this.child = [];
        this[":@"] = {};
      }
      add(key, val) {
        if (key === "__proto__")
          key = "#__proto__";
        this.child.push({ [key]: val });
      }
      addChild(node) {
        if (node.tagname === "__proto__")
          node.tagname = "#__proto__";
        if (node[":@"] && Object.keys(node[":@"]).length > 0) {
          this.child.push({ [node.tagname]: node.child, [":@"]: node[":@"] });
        } else {
          this.child.push({ [node.tagname]: node.child });
        }
      }
    };
    xmlNode$1 = XmlNode;
    entityRegex = RegExp(`^\\s([a-zA-z0-0]+)[ 	](['"])([^&]+)\\2`);
    DocTypeReader = readDocType$1;
    hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
    numRegex = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
    if (!Number.parseInt && window.parseInt) {
      Number.parseInt = window.parseInt;
    }
    if (!Number.parseFloat && window.parseFloat) {
      Number.parseFloat = window.parseFloat;
    }
    consider = {
      hex: true,
      leadingZeros: true,
      decimalPoint: ".",
      eNotation: true
    };
    strnum = toNumber$1;
    util = util$2;
    xmlNode = xmlNode$1;
    readDocType = DocTypeReader;
    toNumber = strnum;
    "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, util.nameRegexp);
    OrderedObjParser$1 = class OrderedObjParser {
      constructor(options) {
        this.options = options;
        this.currentNode = null;
        this.tagsNodeStack = [];
        this.docTypeEntities = {};
        this.lastEntities = {
          "apos": { regex: /&(apos|#39|#x27);/g, val: "'" },
          "gt": { regex: /&(gt|#62|#x3E);/g, val: ">" },
          "lt": { regex: /&(lt|#60|#x3C);/g, val: "<" },
          "quot": { regex: /&(quot|#34|#x22);/g, val: '"' }
        };
        this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" };
        this.htmlEntities = {
          "space": { regex: /&(nbsp|#160);/g, val: " " },
          "cent": { regex: /&(cent|#162);/g, val: "\xA2" },
          "pound": { regex: /&(pound|#163);/g, val: "\xA3" },
          "yen": { regex: /&(yen|#165);/g, val: "\xA5" },
          "euro": { regex: /&(euro|#8364);/g, val: "\u20AC" },
          "copyright": { regex: /&(copy|#169);/g, val: "\xA9" },
          "reg": { regex: /&(reg|#174);/g, val: "\xAE" },
          "inr": { regex: /&(inr|#8377);/g, val: "\u20B9" }
        };
        this.addExternalEntities = addExternalEntities;
        this.parseXml = parseXml;
        this.parseTextData = parseTextData;
        this.resolveNameSpace = resolveNameSpace;
        this.buildAttributesMap = buildAttributesMap;
        this.isItStopNode = isItStopNode;
        this.replaceEntitiesValue = replaceEntitiesValue$1;
        this.readStopNodeData = readStopNodeData;
        this.saveTextToParentTag = saveTextToParentTag;
      }
    };
    attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
    parseXml = function(xmlData) {
      xmlData = xmlData.replace(/\r\n?/g, "\n");
      const xmlObj = new xmlNode("!xml");
      let currentNode = xmlObj;
      let textData = "";
      let jPath = "";
      for (let i = 0; i < xmlData.length; i++) {
        const ch = xmlData[i];
        if (ch === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
            let tagName = xmlData.substring(i + 2, closeIndex).trim();
            if (this.options.removeNSPrefix) {
              const colonIndex = tagName.indexOf(":");
              if (colonIndex !== -1) {
                tagName = tagName.substr(colonIndex + 1);
              }
            }
            if (this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }
            if (currentNode) {
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
            }
            jPath = jPath.substr(0, jPath.lastIndexOf("."));
            currentNode = this.tagsNodeStack.pop();
            textData = "";
            i = closeIndex;
          } else if (xmlData[i + 1] === "?") {
            let tagData = readTagExp(xmlData, i, false, "?>");
            if (!tagData)
              throw new Error("Pi Tag is not closed.");
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            if (this.options.ignoreDeclaration && tagData.tagName === "?xml" || this.options.ignorePiTags)
              ;
            else {
              const childNode = new xmlNode(tagData.tagName);
              childNode.add(this.options.textNodeName, "");
              if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath);
              }
              currentNode.addChild(childNode);
            }
            i = tagData.closeIndex + 1;
          } else if (xmlData.substr(i + 1, 3) === "!--") {
            const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
            if (this.options.commentPropName) {
              const comment = xmlData.substring(i + 4, endIndex - 2);
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
              currentNode.add(this.options.commentPropName, [{ [this.options.textNodeName]: comment }]);
            }
            i = endIndex;
          } else if (xmlData.substr(i + 1, 2) === "!D") {
            const result = readDocType(xmlData, i);
            this.docTypeEntities = result.entities;
            i = result.i;
          } else if (xmlData.substr(i + 1, 2) === "![") {
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
            const tagExp = xmlData.substring(i + 9, closeIndex);
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            if (this.options.cdataPropName) {
              currentNode.add(this.options.cdataPropName, [{ [this.options.textNodeName]: tagExp }]);
            } else {
              let val = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true);
              if (val == void 0)
                val = "";
              currentNode.add(this.options.textNodeName, val);
            }
            i = closeIndex + 2;
          } else {
            let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
            let tagName = result.tagName;
            let tagExp = result.tagExp;
            let attrExpPresent = result.attrExpPresent;
            let closeIndex = result.closeIndex;
            if (this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }
            if (currentNode && textData) {
              if (currentNode.tagname !== "!xml") {
                textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
              }
            }
            if (tagName !== xmlObj.tagname) {
              jPath += jPath ? "." + tagName : tagName;
            }
            const lastTag = currentNode;
            if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
              currentNode = this.tagsNodeStack.pop();
            }
            if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
              let tagContent = "";
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                i = result.closeIndex;
              } else if (this.options.unpairedTags.indexOf(tagName) !== -1) {
                i = result.closeIndex;
              } else {
                const result2 = this.readStopNodeData(xmlData, tagName, closeIndex + 1);
                if (!result2)
                  throw new Error(`Unexpected end of ${tagName}`);
                i = result2.i;
                tagContent = result2.tagContent;
              }
              const childNode = new xmlNode(tagName);
              if (tagName !== tagExp && attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagExp, jPath);
              }
              if (tagContent) {
                tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
              }
              jPath = jPath.substr(0, jPath.lastIndexOf("."));
              childNode.add(this.options.textNodeName, tagContent);
              currentNode.addChild(childNode);
            } else {
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                if (tagName[tagName.length - 1] === "/") {
                  tagName = tagName.substr(0, tagName.length - 1);
                  tagExp = tagName;
                } else {
                  tagExp = tagExp.substr(0, tagExp.length - 1);
                }
                if (this.options.transformTagName) {
                  tagName = this.options.transformTagName(tagName);
                }
                const childNode = new xmlNode(tagName);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath);
                }
                jPath = jPath.substr(0, jPath.lastIndexOf("."));
                currentNode.addChild(childNode);
              } else {
                const childNode = new xmlNode(tagName);
                this.tagsNodeStack.push(currentNode);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath);
                }
                currentNode.addChild(childNode);
                currentNode = childNode;
              }
              textData = "";
              i = closeIndex;
            }
          }
        } else {
          textData += xmlData[i];
        }
      }
      return xmlObj.child;
    };
    replaceEntitiesValue$1 = function(val) {
      if (this.options.processEntities) {
        for (let entityName in this.docTypeEntities) {
          const entity = this.docTypeEntities[entityName];
          val = val.replace(entity.regx, entity.val);
        }
        for (let entityName in this.lastEntities) {
          const entity = this.lastEntities[entityName];
          val = val.replace(entity.regex, entity.val);
        }
        if (this.options.htmlEntities) {
          for (let entityName in this.htmlEntities) {
            const entity = this.htmlEntities[entityName];
            val = val.replace(entity.regex, entity.val);
          }
        }
        val = val.replace(this.ampEntity.regex, this.ampEntity.val);
      }
      return val;
    };
    OrderedObjParser_1 = OrderedObjParser$1;
    node2json = {};
    node2json.prettify = prettify$1;
    ({ buildOptions } = OptionsBuilder);
    OrderedObjParser2 = OrderedObjParser_1;
    ({ prettify } = node2json);
    validator$1 = validator$2;
    XMLParser$1 = class XMLParser {
      constructor(options) {
        this.externalEntities = {};
        this.options = buildOptions(options);
      }
      parse(xmlData, validationOption) {
        if (typeof xmlData === "string")
          ;
        else if (xmlData.toString) {
          xmlData = xmlData.toString();
        } else {
          throw new Error("XML data is accepted in String or Bytes[] form.");
        }
        if (validationOption) {
          if (validationOption === true)
            validationOption = {};
          const result = validator$1.validate(xmlData, validationOption);
          if (result !== true) {
            throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
          }
        }
        const orderedObjParser = new OrderedObjParser2(this.options);
        orderedObjParser.addExternalEntities(this.externalEntities);
        const orderedResult = orderedObjParser.parseXml(xmlData);
        if (this.options.preserveOrder || orderedResult === void 0)
          return orderedResult;
        else
          return prettify(orderedResult, this.options);
      }
      addEntity(key, value) {
        if (value.indexOf("&") !== -1) {
          throw new Error("Entity value can't have '&'");
        } else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
          throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
        } else if (value === "&") {
          throw new Error("An entity with value '&' is not permitted");
        } else {
          this.externalEntities[key] = value;
        }
      }
    };
    XMLParser_1 = XMLParser$1;
    EOL = "\n";
    orderedJs2Xml = toXml;
    buildFromOrderedJs = orderedJs2Xml;
    defaultOptions = {
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      cdataPropName: false,
      format: false,
      indentBy: "  ",
      suppressEmptyNode: false,
      suppressUnpairedNode: true,
      suppressBooleanAttributes: true,
      tagValueProcessor: function(key, a2) {
        return a2;
      },
      attributeValueProcessor: function(attrName, a2) {
        return a2;
      },
      preserveOrder: false,
      commentPropName: false,
      unpairedTags: [],
      entities: [
        { regex: new RegExp("&", "g"), val: "&amp;" },
        { regex: new RegExp(">", "g"), val: "&gt;" },
        { regex: new RegExp("<", "g"), val: "&lt;" },
        { regex: new RegExp("'", "g"), val: "&apos;" },
        { regex: new RegExp('"', "g"), val: "&quot;" }
      ],
      processEntities: true,
      stopNodes: []
    };
    Builder.prototype.build = function(jObj) {
      if (this.options.preserveOrder) {
        return buildFromOrderedJs(jObj, this.options);
      } else {
        if (Array.isArray(jObj) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1) {
          jObj = {
            [this.options.arrayNodeName]: jObj
          };
        }
        return this.j2x(jObj, 0).val;
      }
    };
    Builder.prototype.j2x = function(jObj, level) {
      let attrStr = "";
      let val = "";
      for (let key in jObj) {
        if (typeof jObj[key] === "undefined")
          ;
        else if (jObj[key] === null) {
          if (key[0] === "?")
            val += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
          else
            val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
        } else if (jObj[key] instanceof Date) {
          val += this.buildTextValNode(jObj[key], key, "", level);
        } else if (typeof jObj[key] !== "object") {
          const attr = this.isAttribute(key);
          if (attr) {
            attrStr += this.buildAttrPairStr(attr, "" + jObj[key]);
          } else {
            if (key === this.options.textNodeName) {
              let newval = this.options.tagValueProcessor(key, "" + jObj[key]);
              val += this.replaceEntitiesValue(newval);
            } else {
              val += this.buildTextValNode(jObj[key], key, "", level);
            }
          }
        } else if (Array.isArray(jObj[key])) {
          const arrLen = jObj[key].length;
          for (let j = 0; j < arrLen; j++) {
            const item = jObj[key][j];
            if (typeof item === "undefined")
              ;
            else if (item === null) {
              if (key[0] === "?")
                val += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
              else
                val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
            } else if (typeof item === "object") {
              val += this.processTextOrObjNode(item, key, level);
            } else {
              val += this.buildTextValNode(item, key, "", level);
            }
          }
        } else {
          if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
            const Ks = Object.keys(jObj[key]);
            const L = Ks.length;
            for (let j = 0; j < L; j++) {
              attrStr += this.buildAttrPairStr(Ks[j], "" + jObj[key][Ks[j]]);
            }
          } else {
            val += this.processTextOrObjNode(jObj[key], key, level);
          }
        }
      }
      return { attrStr, val };
    };
    Builder.prototype.buildAttrPairStr = function(attrName, val) {
      val = this.options.attributeValueProcessor(attrName, "" + val);
      val = this.replaceEntitiesValue(val);
      if (this.options.suppressBooleanAttributes && val === "true") {
        return " " + attrName;
      } else
        return " " + attrName + '="' + val + '"';
    };
    Builder.prototype.buildObjectNode = function(val, key, attrStr, level) {
      if (val === "") {
        if (key[0] === "?")
          return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
        else {
          return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
        }
      } else {
        let tagEndExp = "</" + key + this.tagEndChar;
        let piClosingChar = "";
        if (key[0] === "?") {
          piClosingChar = "?";
          tagEndExp = "";
        }
        if (attrStr && val.indexOf("<") === -1) {
          return this.indentate(level) + "<" + key + attrStr + piClosingChar + ">" + val + tagEndExp;
        } else if (this.options.commentPropName !== false && key === this.options.commentPropName && piClosingChar.length === 0) {
          return this.indentate(level) + `<!--${val}-->` + this.newLine;
        } else {
          return this.indentate(level) + "<" + key + attrStr + piClosingChar + this.tagEndChar + val + this.indentate(level) + tagEndExp;
        }
      }
    };
    Builder.prototype.closeTag = function(key) {
      let closeTag = "";
      if (this.options.unpairedTags.indexOf(key) !== -1) {
        if (!this.options.suppressUnpairedNode)
          closeTag = "/";
      } else if (this.options.suppressEmptyNode) {
        closeTag = "/";
      } else {
        closeTag = `></${key}`;
      }
      return closeTag;
    };
    Builder.prototype.buildTextValNode = function(val, key, attrStr, level) {
      if (this.options.cdataPropName !== false && key === this.options.cdataPropName) {
        return this.indentate(level) + `<![CDATA[${val}]]>` + this.newLine;
      } else if (this.options.commentPropName !== false && key === this.options.commentPropName) {
        return this.indentate(level) + `<!--${val}-->` + this.newLine;
      } else if (key[0] === "?") {
        return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
      } else {
        let textValue = this.options.tagValueProcessor(key, val);
        textValue = this.replaceEntitiesValue(textValue);
        if (textValue === "") {
          return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
        } else {
          return this.indentate(level) + "<" + key + attrStr + ">" + textValue + "</" + key + this.tagEndChar;
        }
      }
    };
    Builder.prototype.replaceEntitiesValue = function(textValue) {
      if (textValue && textValue.length > 0 && this.options.processEntities) {
        for (let i = 0; i < this.options.entities.length; i++) {
          const entity = this.options.entities[i];
          textValue = textValue.replace(entity.regex, entity.val);
        }
      }
      return textValue;
    };
    json2xml = Builder;
    validator = validator$2;
    XMLParser2 = XMLParser_1;
    XMLBuilder = json2xml;
    fxp = {
      XMLParser: XMLParser2,
      XMLValidator: validator,
      XMLBuilder
    };
    rssSchema = objectType({
      title: stringType(),
      pubDate: unionType([stringType(), numberType(), dateType()]).transform((value) => new Date(value)),
      description: stringType().optional(),
      customData: stringType().optional(),
      draft: booleanType().optional()
    });
    flattenErrorPath = (errorPath) => errorPath.join(".");
    errorMap = (error2, ctx) => {
      if (error2.code === "invalid_type") {
        const badKeyPath = JSON.stringify(flattenErrorPath(error2.path));
        if (error2.received === "undefined") {
          return { message: `${badKeyPath} is required.` };
        } else {
          return { message: `${badKeyPath} should be ${error2.expected}, not ${error2.received}.` };
        }
      }
      return { message: ctx.defaultError };
    };
    rssFeedItemValidator = rssSchema.extend({ link: stringType(), content: stringType().optional() });
    globResultValidator = recordType(functionType().returns(promiseType(anyType())));
    rssOptionsValidator = objectType({
      title: stringType(),
      description: stringType(),
      site: preprocessType((url6) => url6 instanceof URL ? url6.href : url6, stringType().url()),
      items: arrayType(rssFeedItemValidator).or(globResultValidator).transform((items) => {
        if (!Array.isArray(items)) {
          console.warn(
            yellow(
              "[RSS] Passing a glob result directly has been deprecated. Please migrate to the `pagesGlobToRssItems()` helper: https://docs.astro.build/en/guides/rss/"
            )
          );
          return pagesGlobToRssItems(items);
        }
        return items;
      }),
      xmlns: recordType(stringType()).optional(),
      drafts: booleanType().default(false),
      stylesheet: unionType([stringType(), booleanType()]).optional(),
      customData: stringType().optional()
    });
    contentDir = "/src/content/";
    entryGlob = /* @__PURE__ */ Object.assign({
      "/src/content/blog/first-post.mdx": () => Promise.resolve().then(() => (init_first_post_638333f8(), first_post_638333f8_exports)),
      "/src/content/blog/markdown-style-guide.md": () => Promise.resolve().then(() => (init_markdown_style_guide_600a133d(), markdown_style_guide_600a133d_exports)),
      "/src/content/blog/second-post.md": () => Promise.resolve().then(() => (init_second_post_23000fb7(), second_post_23000fb7_exports)),
      "/src/content/blog/third-post.md": () => Promise.resolve().then(() => (init_third_post_8038df00(), third_post_8038df00_exports)),
      "/src/content/blog/using-mdx.mdx": () => Promise.resolve().then(() => (init_using_mdx_f439665d(), using_mdx_f439665d_exports))
    });
    collectionToEntryMap = createCollectionToGlobResultMap({
      globResult: entryGlob,
      contentDir
    });
    renderEntryGlob = /* @__PURE__ */ Object.assign({
      "/src/content/blog/first-post.mdx": () => Promise.resolve().then(() => (init_first_post_579ad298(), first_post_579ad298_exports)),
      "/src/content/blog/markdown-style-guide.md": () => Promise.resolve().then(() => (init_markdown_style_guide_eee11036(), markdown_style_guide_eee11036_exports)),
      "/src/content/blog/second-post.md": () => Promise.resolve().then(() => (init_second_post_7d2ac92b(), second_post_7d2ac92b_exports)),
      "/src/content/blog/third-post.md": () => Promise.resolve().then(() => (init_third_post_2c694deb(), third_post_2c694deb_exports)),
      "/src/content/blog/using-mdx.mdx": () => Promise.resolve().then(() => (init_using_mdx_f549ec0b(), using_mdx_f549ec0b_exports))
    });
    collectionToRenderEntryMap = createCollectionToGlobResultMap({
      globResult: renderEntryGlob,
      contentDir
    });
    getCollection = createGetCollection({
      collectionToEntryMap,
      collectionToRenderEntryMap
    });
    _page1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      get
    }, Symbol.toStringTag, { value: "Module" }));
    $$Astro$1 = createAstro("https://example.com");
    $$FormattedDate = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
      Astro2.self = $$FormattedDate;
      const { date } = Astro2.props;
      return renderTemplate`${maybeRenderHead($$result)}<time${addAttribute(date.toISOString(), "datetime")}>
	${date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })}
</time>`;
    }, "/home/jim/code/astro/prerender-deno/src/components/FormattedDate.astro");
    $$Astro = createAstro("https://example.com");
    $$Index = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
      Astro2.self = $$Index;
      const posts = (await getCollection("blog")).sort(
        (a2, b) => a2.data.pubDate.valueOf() - b.data.pubDate.valueOf()
      );
      return renderTemplate`<html lang="en" class="astro-5TZNM7MJ">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "class": "astro-5TZNM7MJ" })}
		
	${renderHead($$result)}</head>
	<body class="astro-5TZNM7MJ">
		${renderComponent($$result, "Header", $$Header, { "class": "astro-5TZNM7MJ" })}
		<main class="astro-5TZNM7MJ">
			<section class="astro-5TZNM7MJ">
				<ul class="astro-5TZNM7MJ">
					${posts.map((post) => renderTemplate`<li class="astro-5TZNM7MJ">
								${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": post.data.pubDate, "class": "astro-5TZNM7MJ" })}
								<a${addAttribute(`/blog/${post.slug}/`, "href")} class="astro-5TZNM7MJ">${post.data.title}</a>
							</li>`)}
				</ul>
			</section>
		</main>
		${renderComponent($$result, "Footer", $$Footer, { "class": "astro-5TZNM7MJ" })}
	</body></html>`;
    }, "/home/jim/code/astro/prerender-deno/src/pages/blog/index.astro");
    $$file = "/home/jim/code/astro/prerender-deno/src/pages/blog/index.astro";
    $$url = "/blog";
    _page3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: $$Index,
      file: $$file,
      url: $$url
    }, Symbol.toStringTag, { value: "Module" }));
  }
});

// dist/server/entry.mjs
init_astro_1790c127();

// node_modules/@astrojs/deno/dist/__deno_imports.js
import { Server } from "https://deno.land/std@0.177.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.177.0/http/file_server.ts";
import { fromFileUrl } from "https://deno.land/std@0.177.0/path/mod.ts";

// dist/server/entry.mjs
init_all_b9d9d6d3();

// dist/server/chunks/prerender.85d8377c.mjs
var noop = () => {
};
var _ = noop;
var a = noop;

// dist/server/entry.mjs
var _server = void 0;
var _startPromise = void 0;
async function* getPrerenderedFiles(clientRoot) {
  for await (const ent of Deno.readDir(clientRoot)) {
    if (ent.isDirectory) {
      yield* getPrerenderedFiles(new URL(`./${ent.name}/`, clientRoot));
    } else if (ent.name.endsWith(".html")) {
      yield new URL(`./${ent.name}`, clientRoot);
    }
  }
}
function start$1(manifest, options) {
  if (options.start === false) {
    return;
  }
  const clientRoot = new URL("../client/", import.meta.url);
  const app = new App(manifest);
  const handler = async (request, connInfo) => {
    var _a2;
    if (app.match(request)) {
      let ip = (_a2 = connInfo == null ? void 0 : connInfo.remoteAddr) == null ? void 0 : _a2.hostname;
      Reflect.set(request, Symbol.for("astro.clientAddress"), ip);
      const response = await app.render(request);
      if (app.setCookieHeaders) {
        for (const setCookieHeader of app.setCookieHeaders(response)) {
          response.headers.append("Set-Cookie", setCookieHeader);
        }
      }
      return response;
    }
    const url6 = new URL(request.url);
    const localPath = new URL("./" + app.removeBase(url6.pathname), clientRoot);
    let fileResp = await serveFile(request, fromFileUrl(localPath));
    if (fileResp.status == 404) {
      let fallback;
      for await (const file6 of getPrerenderedFiles(clientRoot)) {
        const pathname = file6.pathname.replace(/\/(index)?\.html$/, "");
        if (localPath.pathname.endsWith(pathname)) {
          fallback = file6;
          break;
        }
      }
      if (fallback) {
        fileResp = await serveFile(request, fromFileUrl(fallback));
      }
    }
    if (fileResp.status == 404) {
      const response = await app.render(request);
      if (app.setCookieHeaders) {
        for (const setCookieHeader of app.setCookieHeaders(response)) {
          response.headers.append("Set-Cookie", setCookieHeader);
        }
      }
      return response;
    } else {
      return fileResp;
    }
  };
  const port = options.port ?? 8085;
  _server = new Server({
    port,
    hostname: options.hostname ?? "0.0.0.0",
    handler
  });
  _startPromise = Promise.resolve(_server.listenAndServe());
  console.error(`Server running on port ${port}`);
}
function createExports(manifest, options) {
  const app = new App(manifest);
  return {
    async stop() {
      if (_server) {
        _server.close();
        _server = void 0;
      }
      await Promise.resolve(_startPromise);
    },
    running() {
      return _server !== void 0;
    },
    async start() {
      return start$1(manifest, options);
    },
    async handle(request) {
      return app.render(request);
    }
  };
}
var adapter = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createExports,
  start: start$1
}, Symbol.toStringTag, { value: "Module" }));
var pageMap = /* @__PURE__ */ new Map([["src/pages/index.astro", _page0], ["src/pages/rss.xml.js", _page1], ["src/pages/about.astro", _], ["src/pages/blog/index.astro", _page3], ["src/pages/blog/[...slug].astro", a]]);
var renderers = [Object.assign({ "name": "astro:jsx", "serverEntrypoint": "astro/jsx/server.js", "jsxImportSource": "astro" }, { ssr: server_default })];
var _manifest2 = Object.assign(deserializeManifest({ "adapterName": "@astrojs/deno", "routes": [{ "file": "about/index.html", "links": [], "scripts": [], "routeData": { "route": "/about", "type": "page", "pattern": "^\\/about\\/?$", "segments": [[{ "content": "about", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/about.astro", "pathname": "/about", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["_astro/about.18532c1a.css", "_astro/HeaderLink.astro_astro_type_style_index_0_lang.c3840210.css"], "scripts": [], "routeData": { "route": "/", "type": "page", "pattern": "^\\/$", "segments": [], "params": [], "component": "src/pages/index.astro", "pathname": "/", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "routeData": { "route": "/rss.xml", "type": "endpoint", "pattern": "^\\/rss\\.xml$", "segments": [[{ "content": "rss.xml", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/rss.xml.js", "pathname": "/rss.xml", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["_astro/about.18532c1a.css", "_astro/HeaderLink.astro_astro_type_style_index_0_lang.c3840210.css", "_astro/index.bf98eded.css"], "scripts": [], "routeData": { "route": "/blog", "type": "page", "pattern": "^\\/blog\\/?$", "segments": [[{ "content": "blog", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/blog/index.astro", "pathname": "/blog", "_meta": { "trailingSlash": "ignore" } } }], "site": "https://example.com", "base": "/", "markdown": { "drafts": false, "syntaxHighlight": "shiki", "shikiConfig": { "langs": [], "theme": "github-dark", "wrap": false }, "remarkPlugins": [], "rehypePlugins": [], "remarkRehype": {}, "gfm": true, "smartypants": true, "contentDir": "file:///home/jim/code/astro/prerender-deno/src/content/" }, "pageMap": null, "propagation": [["/home/jim/code/astro/prerender-deno/src/components/BaseHead.astro", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/components/HeaderLink.astro", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/components/Header.astro", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/components/Footer.astro", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/pages/index.astro", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/pages/blog/[...slug].astro", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/pages/blog/index.astro", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/pages/rss.xml.js", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/components/FormattedDate.astro", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/layouts/BlogPost.astro", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/pages/about.astro", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/content/blog/first-post.mdx?astroContent=true", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/content/blog/using-mdx.mdx?astroContent=true", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/content/blog/first-post.mdx?astroPropagatedAssets=true", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/content/blog/using-mdx.mdx?astroPropagatedAssets=true", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/content/blog/first-post.mdx", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/content/blog/markdown-style-guide.md", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/content/blog/second-post.md", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/content/blog/third-post.md", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/content/blog/using-mdx.mdx", "in-tree"], ["/home/jim/code/astro/prerender-deno/src/pages/blog/index.astro?astro&type=style&index=0&lang.css", "in-tree"]], "renderers": [], "entryModules": { "\0@astrojs-ssr-virtual-entry": "_@astrojs-ssr-virtual-entry.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/first-post.mdx?astroContent=true": "chunks/first-post.638333f8.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/markdown-style-guide.md?astroContent=true": "chunks/markdown-style-guide.600a133d.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/second-post.md?astroContent=true": "chunks/second-post.23000fb7.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/third-post.md?astroContent=true": "chunks/third-post.8038df00.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/using-mdx.mdx?astroContent=true": "chunks/using-mdx.f439665d.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/first-post.mdx?astroPropagatedAssets=true": "chunks/first-post.579ad298.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/markdown-style-guide.md?astroPropagatedAssets=true": "chunks/markdown-style-guide.eee11036.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/second-post.md?astroPropagatedAssets=true": "chunks/second-post.7d2ac92b.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/third-post.md?astroPropagatedAssets=true": "chunks/third-post.2c694deb.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/using-mdx.mdx?astroPropagatedAssets=true": "chunks/using-mdx.f549ec0b.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/first-post.mdx": "chunks/first-post.7d935176.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/markdown-style-guide.md": "chunks/markdown-style-guide.67109a56.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/second-post.md": "chunks/second-post.acdc4732.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/third-post.md": "chunks/third-post.f234ac89.mjs", "/home/jim/code/astro/prerender-deno/src/content/blog/using-mdx.mdx": "chunks/using-mdx.489f60b1.mjs", "astro:scripts/before-hydration.js": "" }, "assets": ["/_astro/HeaderLink.astro_astro_type_style_index_0_lang.c3840210.css", "/_astro/about.3f4867e1.css", "/_astro/about.18532c1a.css", "/_astro/index.bf98eded.css", "/favicon.svg", "/placeholder-about.jpg", "/placeholder-hero.jpg", "/placeholder-social.jpg", "/about/index.html"] }), {
  pageMap,
  renderers
});
var _args = {};
var _exports = createExports(_manifest2, _args);
var stop = _exports["stop"];
var handle = _exports["handle"];
var start = _exports["start"];
var running = _exports["running"];
var _start = "start";
if (_start in adapter) {
  adapter[_start](_manifest2, _args);
}
export {
  handle,
  pageMap,
  renderers,
  running,
  start,
  stop
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

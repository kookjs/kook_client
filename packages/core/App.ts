import { Container } from "inversify";

// import appRoot from "app-root-path";

/**
 * Get classname from ES6 module or require
 * Whilte importing async/await like const demo = import("../demo") -> ES6 it returns classname in c.default
 * but when we require demo = rqeuire("../demo") then it return direct classname
 */
// export function getClass(obj) {
// 	return obj && obj.__esModule ? obj.default : obj;
// }
export function interopDefault(ex: any) {
	return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}


import { DictionaryStrict } from './common/DictionaryStrict'

export default class App {
	public container: Container;
	private plugins: DictionaryStrict<any>;
	

	constructor() {
		// this.config = _.merge(configDefault, config);
		// this.config = config
		this.container = new Container();
		this.plugins = {};
	}

	/*
   Add the plugin to the App Container
  */
	registerPlugin<T>(Plugin: new (...args: any) => T) {
		const key = Plugin.name;
		try {
			this.container.bind(key).to(Plugin).inSingletonScope();
			const p = this.container.get<T>(key);
			this.plugins[key] = p;
		} catch (error) {
			console.log(error);
			console.log((`Register Plugin: ${key} - ${error.message}`));
		}
	}

	/**
	 * Register plugins by specifying the array of plugin paths
	 * @param plugins Object [key: path ]
	 */
	// registerPlugins(plugins: string[]) {
	// 	for (const path of plugins) {
	// 		const plugin = interopDefault(require(path))
	// 		this.registerPlugin(plugin)
	// 	}
	// }

	/*
	 * Execute the boot function declared in all the plugins after instantiate plugin class
	 * NOTE: run app.boot() at the end of your bootstrap file
	 */
	async boot() {
		for (const key of Object.keys(this.plugins)) {
			const plugin = this.plugins[key];
			if (!plugin.boot || typeof plugin.boot !== "function") continue;
			await plugin.boot();
		}
	}

	/*
   Get the plugin from existing App container
  */
	getPlugin<T>(c: new (...args: any) => T): T {
		return this.plugins[c.name] as T;
	}
}

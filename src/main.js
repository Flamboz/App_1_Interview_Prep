import "./style.scss";
import { displayEnvironment } from "./env";
import { setupImageAnalytics } from "./analytics";
import { setupLazyLoad } from "./lazyload";

displayEnvironment();
setupImageAnalytics();
setupLazyLoad();
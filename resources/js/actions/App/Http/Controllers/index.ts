import PublicationController from './PublicationController'
import Settings from './Settings'
const Controllers = {
    PublicationController: Object.assign(PublicationController, PublicationController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers
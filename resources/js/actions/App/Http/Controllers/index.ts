import PublicationController from './PublicationController'
import UserController from './UserController'
import Settings from './Settings'
const Controllers = {
    PublicationController: Object.assign(PublicationController, PublicationController),
UserController: Object.assign(UserController, UserController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers
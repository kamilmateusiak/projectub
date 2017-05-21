import AllProjects from './pages/AllProjects.vue'
import Project from './pages/Project.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Account from './pages/Account.vue'
import Home from './pages/Home.vue'
import NewProject from './pages/NewProject.vue'
import NewItem from './pages/NewItem.vue'

export const routes = [
  { path: '', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/account', name: 'account', component: Account },
  { path: '/projects', name: 'projects', component: AllProjects },
  { path: '/project/:name', name: 'single-project', component: Project },
  { path: '/project/:name/new', name: 'new-item', component: NewItem },
  { path: '/projects/new', name: 'new-project', component: NewProject }
]

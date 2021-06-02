import { Home } from './pages/Home'
import { Chat } from './pages/Chat'
import { UserDetails } from './pages/UserDetails'
import { BoardList } from './pages/BoardList'
import { Board } from './pages/Board'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'

export const routes = [
    {
        path: '/user/:userId',
        component: UserDetails,
    },
    {
        path: '/board/:boardId',
        component: Board,
    },
    {
        path: '/signup',
        component: Signup,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/board',
        component: BoardList
    },
    {
        path: '/',
        component: Home,
    },
]

import { Home } from './pages/Home'
import { LoginSignup } from './pages/LoginSignup'
import { Chat } from './pages/Chat'
import { UserDetails } from './pages/UserDetails'
import { BoardList } from './pages/BoardList'
import { Board } from './pages/Board'
import { Login } from './pages/LoginSignup'

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
        path: '/login',
        component: LoginSignup,
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

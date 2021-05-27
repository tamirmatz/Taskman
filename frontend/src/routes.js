import { Home } from './pages/Home'
import { LoginSignup } from './pages/LoginSignup'
import { Chat } from './pages/Chat'
import { UserDetails } from './pages/UserDetails'
import { BoardList } from './pages/BoardList'
import {Board} from './pages/Board'

export const routes = [
    {
        path: '/board',
        component: BoardList
    },
    {
        path: '/',
        component: Home,
    },
    {
        path: '/board/:boardId',
        component: Board,
    },

]

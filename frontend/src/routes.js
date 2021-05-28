import { Home } from './pages/Home'
import { LoginSignup } from './pages/LoginSignup'
import { Chat } from './pages/Chat'
import { UserDetails } from './pages/UserDetails'
import { BoardList } from './pages/BoardList'
import { Board } from './pages/Board'
import { TaskDetails } from './cmps/board/TaskDetails'

export const routes = [
    {
        path: '/board/:boardId/:groupId/:taskId',
        component: TaskDetails,
    },
    {
        path: '/board/:boardId',
        component: Board,
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

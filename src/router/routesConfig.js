import Root from '@components/App';
import Home from '@views/Home/index';
// import User from '@views/User/index';
// import Login from '@views/loginReg/Login';
import TodoPage from '@views/Friend/todo';
import Topics from '@views/topics/index';
// import Topic from '@views/Topics/Topic';
import Error from '@views/Error/NoMatch';

const routes = [
    {
        path: "/views",
        component: Root,
        routes: [
            {
                path: "/views/",
                exact: true,
                component: Home,
                // requiresAuth: false,
            },
            // {
            //     path:"",
            //     exact: true,
            //     component: Home,
            //     requiresAuth: false,
            // },
            {
                path: "/views/home",
                component: Home,
                // requiresAuth: false,
            },
            // {
            //     path: '/login',
            //     component: Login,
            //     requiresAuth: false,
            // },
            // {
            //     path: "/user",
            //     component: User,
            //     requiresAuth: true, //需要登陆后才能跳转的页面
            // },
            {
                path: "/views/friend",
                component: TodoPage,
                // requiresAuth: true,
            },
            {
                path: "/views/topics",
                // exact: true,
                component: Topics,
                // requiresAuth: true,
                // routes: [
                //     {
                //         path: "/topics/:topicId",
                //         component: Topic,
                //         requiresAuth: true,
                //     },
                // ]
            },
            {
                // path: '/error',
                // name: '404',
                path: '*',
                component: Error,
                // requiresAuth: false,
            },
        ],
    }
];

export default routes;
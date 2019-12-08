import Main from './components/Main';
export const routes = [
    {
        path: '', redirect: 'main'
    },
    {
        path: '/main', component: Main
    }
];

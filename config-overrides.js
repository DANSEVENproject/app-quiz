const { alias } = require('react-app-rewire-alias');

module.exports = function override(config, env) {
    alias({
        '@axios': 'src/axios',
        '@store': 'src/store',
        '@components-logout': 'src/components/Logout',
        '@components-nav': 'src/components/Navigations',
        '@components-ui': 'src/components/UI',
        '@components-active': 'src/components/ActiveQuiz',
        '@components-finish': 'src/components/FinishedQuiz',
        '@containers-auth': 'src/containers/Auth',
        '@containers-quiz': 'src/containers/Quiz',
        '@containers-creator': 'src/containers/QuizCreator',
        '@containers-list': 'src/containers/QuizList',
        '@form': 'src/form',
        '@hoc-layout': 'src/hoc/Layout',
        '@actions': 'src/store/actions',
        '@reducers': 'src/store/reducers',
    })(config);

    return config;
}
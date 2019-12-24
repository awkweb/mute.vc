export default function({ store, error }) {
    if (!store.state.authUser || !store.state.authUser.admin) {
        error({
            message: 'You are not connected',
            statusCode: 403,
        })
    }
}

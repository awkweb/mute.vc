export default function({ store, error }) {
    if (!store.state.authUser || store.state.authUser.userId !== '106590533') {
        error({
            message: 'You are not connected',
            statusCode: 403,
        })
    }
}

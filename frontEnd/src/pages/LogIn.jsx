const LogIn = () => {
    return(
        <>
            <h2>Connect With Us</h2>
            <h3>Login</h3>
    <form method="post">
        <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />     
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />   
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
    </form>
        </>
    )
}

export default LogIn
const SignUp = () => {
    return(
        <>
            <h2>Connect With Us</h2>
            <h3>Sign Up</h3>
    <form method="post">
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />     
        </div>
        <div>
            <label htmlFor="surname">Surname</label>
            <input type="text" name="surname" id="surname" />     
        </div>
        <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />     
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />   
        </div>
        <div>
            <button type="submit">Sign Up</button>
        </div>
    </form>
        </>
    )
}

export default SignUp
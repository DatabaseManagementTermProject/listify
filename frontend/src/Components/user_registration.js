function UserRegistration() {
    function RegistrationForm() {
        const [formData, setFormData] = useState({
            // matches the SQL query data for users table
            userName: '',
            password: '',
            locationCountry: '',
            locationState: '',
            locationCity: '',
        });
    }

    handleSubmit = (e) => {
        // extracts name and value from user input
        const { name, value } = e.target;
        // updates formData with the new data
        setFormData({ ...formData, [name]: value });
    }

    const handleRegistration = async (e) => {
        // stop page from refreshing on submission
        e.preventDefault();
        try {
            const response = await fetch('/register', {
            // specifies the data should be sent to the server
            method: 'POST',
            headers: {
                // sets content of the request to json
                'Content-Type': 'application/json',
            },
            // convert data in formData to json string
            body: JSON.stringify(formData),
            });
            // tests if submission was successful
            if (response.ok) {
            console.log('Registration successful');
            } else {
            console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.userName}
            onChange={handleInputChange}
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
        />
        <input
            type="text"
            name="locationcity"
            placeholder="City"
            value={formData.locationCity}
            onChange={handleInputChange}
        />
        <input
            type="text"
            name="locationstate"
            placeholder="State"
            value={formData.locationState}
            onChange={handleInputChange}
        />
        <input
            type="text"
            name="locationcountry"
            placeholder="Country"
            value={formData.locationCountry}
            onChange={handleInputChange}
        />
        <button type="submit">Register Account</button>
        </form>
    );

    };

export default UserRegistration()

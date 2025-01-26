



export default function Input({location, setLocation}) {

    return <>
        <div>
            <input type='text' placeholder='Search for a city...' value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
    </>
}
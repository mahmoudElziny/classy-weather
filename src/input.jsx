



export default function Input({location, setLocation, inputEl}) {

    return <>
        <div>
            <input ref={inputEl} type='text' placeholder='Search for a city...' value={location} onChange={(e) => setLocation(e.target.value)}/>
        </div>
    </>
}
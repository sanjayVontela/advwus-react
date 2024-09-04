export default async function GetSender(id) {
    try {
        const response = await fetch(`http://localhost:4444/chat/getSender/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        const result = await response.json();
        // console.log(result.data);
        
        return result.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

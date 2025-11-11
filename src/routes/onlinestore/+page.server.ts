import { getAllOnlineStores } from '$lib/data/onlinestores';


export async function load() {
    //get categories from db
    const onlineStores = await getAllOnlineStores();
    

    return { onlineStores };
}

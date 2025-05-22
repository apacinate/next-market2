import Image from "next/image"

export async function generateMetadata(context){
    const singleItem = await getSingleItem(context.params.id)
    return {
        titel:singleItem.title,
        description:singleItem.description
    }
}

const getSingleItem = async(id) => {
    generateMetadata(id)
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,{chache:"no-store"})
    const jsonData = await response.json()
    const singleItem = jsonData.singleItem
    return singleItem
}

const ReadSingleItem = async(context) => {
    const resolvedParams = await context.params; // await をつける
    const singleItem = await getSingleItem(resolvedParams.id)
    return(
        <div className="grid-container-si">
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>\{singleItem.price}</h2>
                <hr/>
                <p>{singleItem.description}</p>
            </div>
        </div>
    )
}
export default ReadSingleItem
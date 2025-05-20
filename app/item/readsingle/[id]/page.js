import Image from "next/image"

const getSingleItem = async(id) => {
    const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`,{chache:"no-store"})
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
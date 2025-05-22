import MyPage from "./myPage"

const UpdateItem = (context) => {
    return <MyPage{...context}/>
}

export default UpdateItem
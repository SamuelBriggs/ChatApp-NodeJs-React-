import React from "react";

function UserSearch({searchKey, setSearchKey}){

    return <div>
        <input
            className="rounded-full"
            placeholder="Search Users / Chats"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            type = "text"/>
    </div>
}
export default UserSearch;
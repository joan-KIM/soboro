import React, {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useFriends, FRIEND_STATUS, FRIEND_ACTION} from '../hooks/useFriends';

const toStatusActions = (status) => {
  switch (status) {
    case FRIEND_STATUS.REQUESTED:
      return [{text: '친구 거절', action: FRIEND_ACTION.REJECT}, {text: '친구 승인', action: FRIEND_ACTION.APPROVE}];
    case FRIEND_STATUS.FRIEND:
      return [{text: '친구 삭제', action: FRIEND_ACTION.REMOVE}, {text: '친구', action: ''}];
    case FRIEND_STATUS.REQUESTING:
      return [{text: '요청 취소', action: FRIEND_ACTION.CANCEL}];
    default: return [];
  }
};

export default function SearchFriendsPage() {
  const {friends, searchFriend, dispatchFriendAction} = useFriends();
  const [result, setResult] = useState();
  console.log(friends);
  const ref = useRef();
  return (
    <div>
      <h1>팔로우 검색/추가 페이지</h1>
      <input ref={ref}></input>
      <button onClick={async () => {
        setResult(await searchFriend(ref.current.value));
      }}>검색</button>
      {result && <dl>
        <dt>{result.name}</dt>
        <dd><img src={result.photoUrl}/></dd>
        <dd>{result.email}</dd>
        <dd>{result.status}</dd>
        {toStatusActions(result.status)
            .map(({text, action}) => <button
              key={text}
              onClick={() => dispatchFriendAction(result.uid, action)}
            >{text}</button>)
        }
      </dl>}
      <Link to="/">뒤로가기</Link>
    </div>
  );
}

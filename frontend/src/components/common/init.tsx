import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { sockets } from "recoil/socket";

const Init = () => {
    const socket = useRecoilValue(sockets);

    return <></>;
}

export default Init;
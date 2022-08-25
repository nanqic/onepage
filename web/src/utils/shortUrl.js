// 获取唯一的Link
import {getPageHead} from "@/api/index.js";

export async function getShortLink() {
    const shortLink = generateShortLink();

    // 查询数据库中是否存在该链接，如果存在，就直接返回
    const searchResult = await getPageHead(shortLink);

    if (searchResult) {
        // 如果shortLink已经存在，就遍历重新生成
        return getShortLink();
    }
    return shortLink;
}

// 生成随机的Link
export function generateShortLink() {
    let str = '';
    const arr = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ];

    for (let i = 0; i < 6; i++) {
        const pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}
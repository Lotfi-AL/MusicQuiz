export const postData = async (url: string, data: any, auth: boolean = false) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (auth) headers.append("Authorization", `Bearer ${localStorage.getItem("USER-TOKEN")}`);

    const response = await fetch("http://localhost:1337/api" + url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers,
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });

    return response.json();
};

export const getData = async (url: string, auth: boolean = false) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (auth) headers.append("Authorization", `Bearer ${localStorage.getItem("USER-TOKEN")}`);

    const response = await fetch("http://localhost:1337/api" + url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers,
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });

    return response.json();
};

//below type String is a function so if you write String without double quotes then it will now show on alert 
//that why i put it inside a double quote

export const tableHeader=[
    {
        "name":"First Name",
        "filter":true,
        "type":"String",
    },
    {
        "name":"Last Name",
        "filter":true,
        "type":"String",
    },
    {
        "name":"Email",
        "filter":true,
        "type":"String",
    },
    {
        "name":"Roles",
        "filter":false,
        "type":"String",
    },
    {
        "name":"Edit",
        "filter":false,
        "type":"Button",
    },
]

export const tableBody=[
    {
        "key":"firstName",
        "type":"String",
    },
    {
        "key":"lastName",
        "type":"String",
    },
    {
        "key":"email",
        "type":"String",
    },
    {
        "key":"role",
        "type":"String",
    },
    
]

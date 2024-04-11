export const config = {
    base_url : String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    project_id : String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT),
    Api_Key : String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),
    Certificate : String(process.env.NEXT_PUBLIC_APP_CERTIFICATE),
    App_ID : String(process.env.NEXT_PUBLIC_APP_ID),
}
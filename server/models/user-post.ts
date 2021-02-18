export interface PostInterface {
    date: string,
    likes: string,
    message: string,
    postedByName: string,
    postedByDate: string
}

export interface UserInterface {
    userID: string,
    firstName: string,
    lastName: string,
    city: string,
    username: string,
    password: string,
    posts: Array<string>,
    _id: string,
    __v: number,
    createdAt: Date,
    updatedAt: Date
}
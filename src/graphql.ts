
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    ADMIN = "ADMIN",
    RETAIL_USER = "RETAIL_USER",
    AUTHOR = "AUTHOR"
}

export interface CreateBookRatingInput {
    bookId: string;
    userId: string;
    review?: Nullable<string>;
    rating?: Nullable<number>;
}

export interface UpdateBookRatingInput {
    id: string;
    review?: Nullable<string>;
    rating?: Nullable<number>;
}

export interface CreateBookInput {
    title: string;
    description: string;
    price: number;
    authors: Nullable<AuthorInfo>[];
}

export interface AuthorInfo {
    name: string;
    username: string;
}

export interface UpdateBookInput {
    id: string;
    title?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
}

export interface CreatePurchaseInput {
    bookId: string;
    userId: string;
    quantity: number;
    purchaseDate: Date;
}

export interface UpdatePurchaseInput {
    id: string;
    quantity?: Nullable<number>;
    purchaseDate?: Nullable<Date>;
}

export interface SignUpInput {
    name: string;
    email: string;
    password: string;
    username: string;
    role: Role;
}

export interface BookRating {
    id: string;
    bookId: string;
    userId: string;
    review?: Nullable<string>;
    rating?: Nullable<number>;
}

export interface IQuery {
    getAllBookRatings(): Nullable<BookRating>[] | Promise<Nullable<BookRating>[]>;
    getBookRatingById(id: string): Nullable<BookRating> | Promise<Nullable<BookRating>>;
    getAllBooks(): Nullable<Book>[] | Promise<Nullable<Book>[]>;
    getBookById(id: string): Nullable<Book> | Promise<Nullable<Book>>;
    getAllPurchases(): Nullable<Purchase>[] | Promise<Nullable<Purchase>[]>;
    getPurchaseById(id: string): Nullable<Purchase> | Promise<Nullable<Purchase>>;
    getUserPurchases(userId: string): Nullable<Purchase>[] | Promise<Nullable<Purchase>[]>;
    getBookPurchases(bookId: string): Nullable<Purchase>[] | Promise<Nullable<Purchase>[]>;
    getMyPurchaseHistory(): Nullable<Purchase>[] | Promise<Nullable<Purchase>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createBookRating(createBookRatingInput: CreateBookRatingInput): BookRating | Promise<BookRating>;
    updateBookRating(updateBookRatingInput: UpdateBookRatingInput): BookRating | Promise<BookRating>;
    deleteBookRating(id: string): Nullable<BookRating> | Promise<Nullable<BookRating>>;
    createBook(createBookInput: CreateBookInput): Book | Promise<Book>;
    updateBook(updateBookInput: UpdateBookInput): string | Promise<string>;
    removeBook(id: string): string | Promise<string>;
    createPurchase(createPurchaseInput: CreatePurchaseInput): Purchase | Promise<Purchase>;
    updatePurchase(updatePurchaseInput: UpdatePurchaseInput): string | Promise<string>;
    removePurchase(id: string): string | Promise<string>;
    signUp(signUpInput: SignUpInput): UserWithToken | Promise<UserWithToken>;
    login(email: string, password: string): UserWithToken | Promise<UserWithToken>;
}

export interface Book {
    id: string;
    title: string;
    description: string;
    price: number;
    authors: Nullable<Author>[];
}

export interface Author {
    name: string;
    username: string;
}

export interface Purchase {
    id: string;
    bookId: string;
    userId: string;
    bookPrice: number;
    totalPrice: number;
    quantity: number;
    purchaseDate: Date;
}

export interface User {
    name: string;
    email: string;
    username: string;
}

export interface UserWithToken {
    user: User;
    token: string;
}

type Nullable<T> = T | null;

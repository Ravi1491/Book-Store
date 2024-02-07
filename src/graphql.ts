
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
    exampleField?: Nullable<number>;
}

export interface UpdatePurchaseInput {
    id: number;
}

export interface SignUpInput {
    name: string;
    email: string;
    password: string;
    username: string;
    role: Role;
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

export interface IQuery {
    getAllBooks(): Nullable<Book>[] | Promise<Nullable<Book>[]>;
    getBookById(id: string): Nullable<Book> | Promise<Nullable<Book>>;
    purchases(): Nullable<Purchase>[] | Promise<Nullable<Purchase>[]>;
    purchase(id: number): Nullable<Purchase> | Promise<Nullable<Purchase>>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createBook(createBookInput: CreateBookInput): Book | Promise<Book>;
    updateBook(updateBookInput: UpdateBookInput): string | Promise<string>;
    removeBook(id: string): string | Promise<string>;
    createPurchase(createPurchaseInput: CreatePurchaseInput): Purchase | Promise<Purchase>;
    updatePurchase(updatePurchaseInput: UpdatePurchaseInput): Purchase | Promise<Purchase>;
    removePurchase(id: number): Nullable<Purchase> | Promise<Nullable<Purchase>>;
    signUp(signUpInput: SignUpInput): UserWithToken | Promise<UserWithToken>;
    login(email: string, password: string): UserWithToken | Promise<UserWithToken>;
}

export interface Purchase {
    exampleField?: Nullable<number>;
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

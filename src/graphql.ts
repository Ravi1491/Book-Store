
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
    authors: AuthorInfo;
}

export interface AuthorInfo {
    name: string;
}

export interface UpdateBookInput {
    id: number;
    title?: Nullable<string>;
    SellCount?: Nullable<number>;
    description?: Nullable<string>;
    price?: Nullable<number>;
}

export interface SignUpInput {
    name: string;
    email: string;
    password: string;
    username: string;
    role: Role;
}

export interface Book {
    id: number;
    title: string;
    description: string;
    price: number;
    authors: Nullable<Author>[];
}

export interface Author {
    id: number;
    name: string;
}

export interface IQuery {
    getAllBooks(): Nullable<Book>[] | Promise<Nullable<Book>[]>;
    getBookById(id: string): Nullable<Book> | Promise<Nullable<Book>>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createBook(createBookInput: CreateBookInput): Book | Promise<Book>;
    updateBook(updateBookInput: UpdateBookInput): Book | Promise<Book>;
    removeBook(id: string): string | Promise<string>;
    signUp(signUpInput: SignUpInput): User | Promise<User>;
    login(email: string, password: string): User | Promise<User>;
}

export interface User {
    name: string;
    email: string;
    username: string;
}

type Nullable<T> = T | null;

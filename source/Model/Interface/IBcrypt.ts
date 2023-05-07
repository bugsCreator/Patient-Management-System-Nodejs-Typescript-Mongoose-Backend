export default interface IBcrypt {

    hash(password: string, saltRounds: number): Promise<string>;
    compare(data: string | Buffer, encrypted: string): Promise<boolean>

}
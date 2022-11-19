/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * Fake repository for the tests
 */
export class FakeRepository {
    public create(): void {}
    public async count(): Promise<void> {}
    public async save(): Promise<void> {}
    public async remove(): Promise<void> {}
    public async delete(): Promise<void> {}
    public async findOne(): Promise<void> {}
    public async findOneBy(): Promise<void> {}
    public async find(): Promise<void> {}
    public async findAndCount(): Promise<void> {}
}

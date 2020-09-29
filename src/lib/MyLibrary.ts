export interface Foo {
  executeDependency: Function;
}

export class MyLibrary implements Foo {
  executeDependency() {
    return 'ko co viec gi kho';
  }
}

export default MyLibrary;

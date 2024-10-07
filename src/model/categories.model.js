export class CategoryNode {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.childs = [];
  };
  getID(){
    return this.id;
  };
  append(id, name, description) {
    const newNode = new CategoryNode(id, name, description);
    this.childs.push(newNode);
  };
  getHead(){
    return this.head;
  };
  getLastChild() {
    return this.childs[this.childs.length - 1];
  };
};


import {
    consoleBuffer,
    consoleEnd,
    consoleStart,
    validateFxn,
} from './helpers';

class Node {
    data: number;
    left: Node;
    right: Node;
    height: number;

    constructor(data: number = null, left: Node = null, right: Node = null) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1;
    }

    push(data: number) {
        if (this.pushNodeLeft(data)) {
            if (this.left !== null) {
                this.left.push(data);
            } else {
                this.left = new Node(data);
            }

            this.doINeedToIncrementHeightLeft();
        } else {
            if (this.right !== null) {
                this.right.push(data);
            } else {
                this.right = new Node(data);
            }

            this.doINeedToIncrementHeightRight();
        }

        this.balanceTreeIfNeeded();
    }

    pushNodeLeft(data: number) {
        return data < this.data;
    }

    balanceTreeIfNeeded() {
        const rightHeight = this.ifNotNullReturnHeight(this.right);
        const leftHeight = this.ifNotNullReturnHeight(this.left);

        if (leftHeight > rightHeight + 1 || leftHeight + 1 < rightHeight) {
            let leftRightHeight = 0;
            let leftLeftHeight = 0;
            let rightRightHeight = 0;
            let rightLeftHeight = 0;

            if (this.left) {
                leftRightHeight = this.ifNotNullReturnHeight(this.left.right);
                leftLeftHeight = this.ifNotNullReturnHeight(this.left.left);
            }

            if (this.right) {
                rightRightHeight = this.ifNotNullReturnHeight(this.right.right);
                rightLeftHeight = this.ifNotNullReturnHeight(this.right.left);
            }

            if (leftHeight > rightHeight + 1) {
                //do I need to double rotate?
                if (leftRightHeight > leftLeftHeight) {
                    this.left.rotateRight();
                }

                this.rotateLeft();
            } else if (rightHeight > leftHeight + 1) {
                //do I need to double rotate?
                if (rightLeftHeight > rightRightHeight) {
                    this.right.rotateLeft();
                }

                this.rotateRight();
            }
        }
    }

    ifNotNullReturnHeight(node: Node) {
        if (node) {
            return node.height;
        }

        return 0;
    }

    rotateLeft() {
        //solution from teacher
        const dataBefore = this.data;
        const rightBefore = this.right;
        this.data = this.left.data;
        this.right = this.left;
        this.left = this.left.left;
        this.right.left = this.right.right;
        this.right.right = rightBefore;
        this.right.data = dataBefore;
        this.right.updateHeights();
        this.updateHeights();
    }
    rotateRight() {
        // store temp vars - for setting to left after initial swaps are done
        const rootData = this.data;
        const leftNode = this.left;

        // swap data
        this.data = this.right.data; // move data to root data
        this.left = this.right; // rotate right into left (balance)
        this.right = this.right.right; // pull right 'up' the tree (if needed)
        this.left.right = this.left.left; //

        // reassign left node after swap
        this.left.left = leftNode;
        this.left.data = rootData;

        //update heights as needed
        this.left.updateHeights();
        this.updateHeights();
    }

    updateHeights() {
        if (!this.right && !this.left) {
            this.height = 1;
        } else if (
            !this.right ||
            (this.left && this.right.height < this.left.height)
        ) {
            this.height = this.left.height + 1;
        } else {
            this.height = this.right.height + 1;
        }
    }

    doINeedToIncrementHeightLeft() {
        if (!this.right || this.right.height < this.left.height) {
            this.height = this.left.height + 1;
        }
    }

    doINeedToIncrementHeightRight() {
        if (!this.left || this.right.height > this.left.height) {
            this.height = this.right.height + 1;
        }
    }

    serialize() {
        // @ts-ignore
        const ans: Node = { data: this.data };
        ans.left = this.left === null ? null : this.left.serialize();
        ans.right = this.right === null ? null : this.right.serialize();
        return ans;
    }
}

export class AVLTree {
    root: Node;

    constructor() {
        this.root = null;
    }

    push(data) {
        if (!this.root) {
            this.root = new Node(data);
        } else {
            this.root.push(data);
        }
    }
    toObject() {
        return this.root.serialize();
    }
}

const breadthFirstSearch = (tree: any, array: number[]): number[] => {
    while (tree.length) {
        const node = tree.shift();
        array.push(node.data);

        if (node.left) {
            tree.push(node.left);
        }

        if (node.right) {
            tree.push(node.right);
        }
    }

    return array;
};

consoleStart();

const nums = [8, 4, 3, 2, 5, 7, 6, 12, 10, 9, 11];
const tree = new AVLTree();
nums.map((num) => tree.push(num));
const tree2 = tree;

const objs = tree.toObject();

validateFxn(
    breadthFirstSearch([objs], []),
    [7, 4, 10, 3, 5, 8, 12, 2, 6, 9, 11]
);

consoleEnd();
consoleBuffer();

export {};


# fs-force-mkdir

## Requirements

 * Node >= 6.0.0

## Usage

```javascript
var mkdirSync = require('fs-force-mkdir-sync');
try {
    let info = mkdirSync('./a/b/c');
    console.log('Succeed', info);
} catch (error) {
    console.log('Failed', error);
}
```

The code above would check for existence of `'./a'`, `'./a/b'` and `'./a/b/c'`,
 * If one is a directory, `mkdir` skip this directory and check the next
 * If one doesn't exist, `mkdir` would creates it as a empty directory
 * If one is a file, `mkdir` would deletes that file and creates a directory with the same name

## License

[MIT](https://github.com/ksxnodemodules/my-licenses/blob/master/MIT.md) © [Hoàng Văn Khải](https://github.com/KSXGitHub)

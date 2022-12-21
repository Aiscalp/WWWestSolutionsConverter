# wwwestsolutionsconverter

Додаток повинен складатися з двох сторінок:

*Конвертер із однієї валюти до іншої. 
+ На цій сторінці має бути текстове поле, в яке можна ввести текст у вигляді 15 usd in uah та отримати результат.

*Сторінка із поточними курсами валют. 
+ На цій сторінці користувач має бачити «свіжі» курси валют щодо базової валюти — наприклад, якщо базова валюта — гривня, то користувач бачить, що 1 USD = 36.6932 UAH і так для всіх можливих валют в АПІ.
- Користувач має мати змогу додавати валюти в обрані, обрані валюти показуються в списку зверху.
+ За замовчуванням у користувача має визначатися «базова» валюта, яку може налаштувати.

Для отримання поточних курсів знайдіть та використовуйте будь-яке відкрите API.
Наприклад: https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

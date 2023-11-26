# Админка
Веб-приложение для администрирования ресурсов с использованием библиотеки React, в качестве стейт-менеджера использован Zustand. <br>
Приложение включает в себя страницу авторизации и админку. <br>

Возможности:
* Отображение пользователей;
* Редактирование информации о пользователях;
* Удаление пользователей;
* Добавление новых пользователей.

## Демо
Посмотреть можно по ссылке: <a href="https://admin-panel-steel-eta.vercel.app/" target="_blank">https://admin-panel-steel-eta.vercel.app/</a>

*Данные для входа:*  
Email: `test@test.com`  
Пароль: `test`

## Запуск
```console
git clone https://github.com/vadmitriev/admin-panel.git
```
``` console
cd admin-panel
```
``` console
cp env.sample .env
```

С использованием Nodejs локально:
``` console
yarn
```
```console
yarn run dev
```

С использованием Docker-контейнера:
```console
docker build -t admin .
```
``` console
docker run --publish 3000:3000 admin
```

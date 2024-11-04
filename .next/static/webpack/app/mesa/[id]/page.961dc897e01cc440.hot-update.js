"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/mesa/[id]/page",{

/***/ "(app-pages-browser)/./src/app/mesa/[id]/page.tsx":
/*!************************************!*\
  !*** ./src/app/mesa/[id]/page.tsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _page_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page.css */ \"(app-pages-browser)/./src/app/mesa/[id]/page.css\");\n/* harmony import */ var _components_Biblioteca_biblioteca__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/Biblioteca/biblioteca */ \"(app-pages-browser)/./src/components/Biblioteca/biblioteca.tsx\");\n/* harmony import */ var _components_Chat_chat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/Chat/chat */ \"(app-pages-browser)/./src/components/Chat/chat.tsx\");\n/* harmony import */ var _components_Jogadores_jogadores__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/Jogadores/jogadores */ \"(app-pages-browser)/./src/components/Jogadores/jogadores.tsx\");\n/* harmony import */ var _components_Sidebar_sidebar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/Sidebar/sidebar */ \"(app-pages-browser)/./src/components/Sidebar/sidebar.tsx\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! sweetalert2 */ \"(app-pages-browser)/./node_modules/sweetalert2/dist/sweetalert2.all.js\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_8__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\nconst Mesa = ()=>{\n    _s();\n    const { id: mesaId } = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)();\n    const [idUsuarioLocal, setIdUsuarioLocal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [refreshKey, setRefreshKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [isUserAdded, setIsUserAdded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const id = localStorage.getItem(\"client_key\");\n        if (id) {\n            setIdUsuarioLocal(id);\n        }\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const adicionarUsuarioNaMesa = async ()=>{\n            if (!idUsuarioLocal || isUserAdded) return;\n            try {\n                const response = await fetch(\"\".concat(\"http://localhost:3004\", \"/mesas/\").concat(mesaId, \"/usuarios/\").concat(idUsuarioLocal), {\n                    method: \"POST\",\n                    headers: {\n                        \"Content-Type\": \"application/json\"\n                    }\n                });\n                if (response.ok) {\n                    setIsUserAdded(true);\n                    setRefreshKey((prevKey)=>prevKey + 1);\n                } else {\n                    console.error(\"Erro ao adicionar usu\\xe1rio \\xe0 mesa\");\n                }\n            } catch (error) {\n                console.error(\"Erro na requisi\\xe7\\xe3o para adicionar usu\\xe1rio \\xe0 mesa\", error);\n            }\n        };\n        if (idUsuarioLocal) {\n            adicionarUsuarioNaMesa();\n        }\n    }, [\n        mesaId,\n        idUsuarioLocal,\n        isUserAdded\n    ]);\n    const handleSairMesa = async ()=>{\n        const result = await sweetalert2__WEBPACK_IMPORTED_MODULE_8___default().fire({\n            title: \"Sair da Mesa?\",\n            text: \"Voc\\xea tem certeza que deseja sair?\",\n            icon: \"warning\",\n            showCancelButton: true,\n            confirmButtonColor: \"#3085d6\",\n            cancelButtonColor: \"#d33\",\n            confirmButtonText: \"Sim, sair!\",\n            cancelButtonText: \"N\\xe3o, ficar!\"\n        });\n        if (result.isConfirmed) {\n            await removerUsuarioDaMesa();\n            window.location.href = \"/\"; // Redireciona para a home\n        }\n    };\n    const removerUsuarioDaMesa = async ()=>{\n        if (!idUsuarioLocal) return;\n        try {\n            const response = await fetch(\"\".concat(\"http://localhost:3004\", \"/mesas/\").concat(mesaId, \"/usuarios/\").concat(idUsuarioLocal), {\n                method: \"DELETE\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                }\n            });\n            if (!response.ok) {\n                console.error(\"Erro ao remover usu\\xe1rio da mesa\");\n            }\n        } catch (error) {\n            console.error(\"Erro na requisi\\xe7\\xe3o para remover usu\\xe1rio da mesa\", error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Sidebar_sidebar__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Jogadores_jogadores__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                        mesaId: Number(mesaId)\n                    }, refreshKey, false, {\n                        fileName: \"C:\\\\Users\\\\Victor\\\\OneDrive\\\\\\xc1rea de Trabalho\\\\Proj Integrador\\\\projeto-nexus\\\\main\\\\src\\\\app\\\\mesa\\\\[id]\\\\page.tsx\",\n                        lineNumber: 92,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Biblioteca_biblioteca__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Victor\\\\OneDrive\\\\\\xc1rea de Trabalho\\\\Proj Integrador\\\\projeto-nexus\\\\main\\\\src\\\\app\\\\mesa\\\\[id]\\\\page.tsx\",\n                        lineNumber: 93,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleSairMesa,\n                        children: \"Sair da Mesa\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Victor\\\\OneDrive\\\\\\xc1rea de Trabalho\\\\Proj Integrador\\\\projeto-nexus\\\\main\\\\src\\\\app\\\\mesa\\\\[id]\\\\page.tsx\",\n                        lineNumber: 94,\n                        columnNumber: 17\n                    }, undefined),\n                    \" \"\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Victor\\\\OneDrive\\\\\\xc1rea de Trabalho\\\\Proj Integrador\\\\projeto-nexus\\\\main\\\\src\\\\app\\\\mesa\\\\[id]\\\\page.tsx\",\n                lineNumber: 91,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Chat_chat__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Victor\\\\OneDrive\\\\\\xc1rea de Trabalho\\\\Proj Integrador\\\\projeto-nexus\\\\main\\\\src\\\\app\\\\mesa\\\\[id]\\\\page.tsx\",\n                lineNumber: 96,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Victor\\\\OneDrive\\\\\\xc1rea de Trabalho\\\\Proj Integrador\\\\projeto-nexus\\\\main\\\\src\\\\app\\\\mesa\\\\[id]\\\\page.tsx\",\n        lineNumber: 90,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Mesa, \"TAfTFc4iz54kz7ABSbm9GUuydOU=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams\n    ];\n});\n_c = Mesa;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Mesa);\nvar _c;\n$RefreshReg$(_c, \"Mesa\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbWVzYS9baWRdL3BhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ21EO0FBQ1A7QUFDeEI7QUFDd0M7QUFDbEI7QUFDZTtBQUNOO0FBQ3BCO0FBRS9CLE1BQU1TLE9BQU87O0lBQ1QsTUFBTSxFQUFFQyxJQUFJQyxNQUFNLEVBQUUsR0FBR1IsMERBQVNBO0lBQ2hDLE1BQU0sQ0FBQ1MsZ0JBQWdCQyxrQkFBa0IsR0FBR1gsK0NBQVFBLENBQWdCO0lBQ3BFLE1BQU0sQ0FBQ1ksWUFBWUMsY0FBYyxHQUFHYiwrQ0FBUUEsQ0FBQztJQUM3QyxNQUFNLENBQUNjLGFBQWFDLGVBQWUsR0FBR2YsK0NBQVFBLENBQUM7SUFFL0NELGdEQUFTQSxDQUFDO1FBQ04sTUFBTVMsS0FBS1EsYUFBYUMsT0FBTyxDQUFDO1FBQ2hDLElBQUlULElBQUk7WUFDSkcsa0JBQWtCSDtRQUN0QjtJQUNKLEdBQUcsRUFBRTtJQUVMVCxnREFBU0EsQ0FBQztRQUNOLE1BQU1tQix5QkFBeUI7WUFDM0IsSUFBSSxDQUFDUixrQkFBa0JJLGFBQWE7WUFFcEMsSUFBSTtnQkFDQSxNQUFNSyxXQUFXLE1BQU1DLE1BQU0sR0FBNENYLE9BQXpDWSx1QkFBK0IsRUFBQyxXQUE0QlgsT0FBbkJELFFBQU8sY0FBMkIsT0FBZkMsaUJBQWtCO29CQUMxR2MsUUFBUTtvQkFDUkMsU0FBUzt3QkFDTCxnQkFBZ0I7b0JBQ3BCO2dCQUNKO2dCQUVBLElBQUlOLFNBQVNPLEVBQUUsRUFBRTtvQkFDYlgsZUFBZTtvQkFDZkYsY0FBY2MsQ0FBQUEsVUFBV0EsVUFBVTtnQkFDdkMsT0FBTztvQkFDSEMsUUFBUUMsS0FBSyxDQUFDO2dCQUNsQjtZQUNKLEVBQUUsT0FBT0EsT0FBTztnQkFDWkQsUUFBUUMsS0FBSyxDQUFDLGdFQUFvREE7WUFDdEU7UUFDSjtRQUVBLElBQUluQixnQkFBZ0I7WUFDaEJRO1FBQ0o7SUFDSixHQUFHO1FBQUNUO1FBQVFDO1FBQWdCSTtLQUFZO0lBRXhDLE1BQU1nQixpQkFBaUI7UUFDbkIsTUFBTUMsU0FBUyxNQUFNekIsdURBQVMsQ0FBQztZQUMzQjJCLE9BQU87WUFDUEMsTUFBTTtZQUNOQyxNQUFNO1lBQ05DLGtCQUFrQjtZQUNsQkMsb0JBQW9CO1lBQ3BCQyxtQkFBbUI7WUFDbkJDLG1CQUFtQjtZQUNuQkMsa0JBQWtCO1FBQ3RCO1FBRUEsSUFBSVQsT0FBT1UsV0FBVyxFQUFFO1lBQ3BCLE1BQU1DO1lBQ05DLE9BQU9DLFFBQVEsQ0FBQ0MsSUFBSSxHQUFHLEtBQUssMEJBQTBCO1FBQzFEO0lBQ0o7SUFFQSxNQUFNSCx1QkFBdUI7UUFDekIsSUFBSSxDQUFDaEMsZ0JBQWdCO1FBRXJCLElBQUk7WUFDQSxNQUFNUyxXQUFXLE1BQU1DLE1BQU0sR0FBNENYLE9BQXpDWSx1QkFBK0IsRUFBQyxXQUE0QlgsT0FBbkJELFFBQU8sY0FBMkIsT0FBZkMsaUJBQWtCO2dCQUMxR2MsUUFBUTtnQkFDUkMsU0FBUztvQkFDTCxnQkFBZ0I7Z0JBQ3BCO1lBQ0o7WUFFQSxJQUFJLENBQUNOLFNBQVNPLEVBQUUsRUFBRTtnQkFDZEUsUUFBUUMsS0FBSyxDQUFDO1lBQ2xCO1FBQ0osRUFBRSxPQUFPQSxPQUFPO1lBQ1pELFFBQVFDLEtBQUssQ0FBQyw0REFBbURBO1FBQ3JFO0lBQ0o7SUFFQSxxQkFDSSw4REFBQ2lCOzswQkFDRyw4REFBQ3pDLG1FQUFPQTs7a0NBQ0osOERBQUNELHVFQUFTQTt3QkFBQ0ssUUFBUXNDLE9BQU90Qzt1QkFBY0c7Ozs7O2tDQUN4Qyw4REFBQ1YseUVBQVVBOzs7OztrQ0FDWCw4REFBQzhDO3dCQUFPQyxTQUFTbkI7a0NBQWdCOzs7Ozs7b0JBQXFCOzs7Ozs7OzBCQUUxRCw4REFBQzNCLDZEQUFJQTs7Ozs7Ozs7Ozs7QUFHakI7R0F4Rk1JOztRQUNxQk4sc0RBQVNBOzs7S0FEOUJNO0FBMEZOLCtEQUFlQSxJQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvbWVzYS9baWRdL3BhZ2UudHN4PzI2MmMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZVBhcmFtcyB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XHJcbmltcG9ydCAnLi9wYWdlLmNzcyc7XHJcbmltcG9ydCBCaWJsaW90ZWNhIGZyb20gJ0AvY29tcG9uZW50cy9CaWJsaW90ZWNhL2JpYmxpb3RlY2EnO1xyXG5pbXBvcnQgQ2hhdCBmcm9tICdAL2NvbXBvbmVudHMvQ2hhdC9jaGF0JztcclxuaW1wb3J0IEpvZ2Fkb3JlcyBmcm9tICdAL2NvbXBvbmVudHMvSm9nYWRvcmVzL2pvZ2Fkb3Jlcyc7XHJcbmltcG9ydCBTaWRlYmFyIGZyb20gJ0AvY29tcG9uZW50cy9TaWRlYmFyL3NpZGViYXInO1xyXG5pbXBvcnQgU3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XHJcblxyXG5jb25zdCBNZXNhID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBpZDogbWVzYUlkIH0gPSB1c2VQYXJhbXMoKTtcclxuICAgIGNvbnN0IFtpZFVzdWFyaW9Mb2NhbCwgc2V0SWRVc3VhcmlvTG9jYWxdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XHJcbiAgICBjb25zdCBbcmVmcmVzaEtleSwgc2V0UmVmcmVzaEtleV0gPSB1c2VTdGF0ZSgwKTtcclxuICAgIGNvbnN0IFtpc1VzZXJBZGRlZCwgc2V0SXNVc2VyQWRkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNsaWVudF9rZXlcIik7XHJcbiAgICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgICAgIHNldElkVXN1YXJpb0xvY2FsKGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBhZGljaW9uYXJVc3VhcmlvTmFNZXNhID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWlkVXN1YXJpb0xvY2FsIHx8IGlzVXNlckFkZGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19VUkxfQVBJfS9tZXNhcy8ke21lc2FJZH0vdXN1YXJpb3MvJHtpZFVzdWFyaW9Mb2NhbH1gLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRJc1VzZXJBZGRlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRSZWZyZXNoS2V5KHByZXZLZXkgPT4gcHJldktleSArIDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGFkaWNpb25hciB1c3XDoXJpbyDDoCBtZXNhJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvIG5hIHJlcXVpc2nDp8OjbyBwYXJhIGFkaWNpb25hciB1c3XDoXJpbyDDoCBtZXNhJywgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGlkVXN1YXJpb0xvY2FsKSB7XHJcbiAgICAgICAgICAgIGFkaWNpb25hclVzdWFyaW9OYU1lc2EoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbbWVzYUlkLCBpZFVzdWFyaW9Mb2NhbCwgaXNVc2VyQWRkZWRdKTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVTYWlyTWVzYSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ1NhaXIgZGEgTWVzYT8nLFxyXG4gICAgICAgICAgICB0ZXh0OiBcIlZvY8OqIHRlbSBjZXJ0ZXphIHF1ZSBkZXNlamEgc2Fpcj9cIixcclxuICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdTaW0sIHNhaXIhJyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ07Do28sIGZpY2FyISdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc0NvbmZpcm1lZCkge1xyXG4gICAgICAgICAgICBhd2FpdCByZW1vdmVyVXN1YXJpb0RhTWVzYSgpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJzsgLy8gUmVkaXJlY2lvbmEgcGFyYSBhIGhvbWVcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbW92ZXJVc3VhcmlvRGFNZXNhID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGlmICghaWRVc3VhcmlvTG9jYWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19VUkxfQVBJfS9tZXNhcy8ke21lc2FJZH0vdXN1YXJpb3MvJHtpZFVzdWFyaW9Mb2NhbH1gLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gcmVtb3ZlciB1c3XDoXJpbyBkYSBtZXNhJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvIG5hIHJlcXVpc2nDp8OjbyBwYXJhIHJlbW92ZXIgdXN1w6FyaW8gZGEgbWVzYScsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPG1haW4+XHJcbiAgICAgICAgICAgIDxTaWRlYmFyPlxyXG4gICAgICAgICAgICAgICAgPEpvZ2Fkb3JlcyBtZXNhSWQ9e051bWJlcihtZXNhSWQpfSBrZXk9e3JlZnJlc2hLZXl9IC8+XHJcbiAgICAgICAgICAgICAgICA8QmlibGlvdGVjYSAvPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVTYWlyTWVzYX0+U2FpciBkYSBNZXNhPC9idXR0b24+IHsvKiBCb3TDo28gcGFyYSBzYWlyICovfVxyXG4gICAgICAgICAgICA8L1NpZGViYXI+XHJcbiAgICAgICAgICAgIDxDaGF0IC8+XHJcbiAgICAgICAgPC9tYWluPlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1lc2E7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlUGFyYW1zIiwiQmlibGlvdGVjYSIsIkNoYXQiLCJKb2dhZG9yZXMiLCJTaWRlYmFyIiwiU3dhbCIsIk1lc2EiLCJpZCIsIm1lc2FJZCIsImlkVXN1YXJpb0xvY2FsIiwic2V0SWRVc3VhcmlvTG9jYWwiLCJyZWZyZXNoS2V5Iiwic2V0UmVmcmVzaEtleSIsImlzVXNlckFkZGVkIiwic2V0SXNVc2VyQWRkZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYWRpY2lvbmFyVXN1YXJpb05hTWVzYSIsInJlc3BvbnNlIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfVVJMX0FQSSIsIm1ldGhvZCIsImhlYWRlcnMiLCJvayIsInByZXZLZXkiLCJjb25zb2xlIiwiZXJyb3IiLCJoYW5kbGVTYWlyTWVzYSIsInJlc3VsdCIsImZpcmUiLCJ0aXRsZSIsInRleHQiLCJpY29uIiwic2hvd0NhbmNlbEJ1dHRvbiIsImNvbmZpcm1CdXR0b25Db2xvciIsImNhbmNlbEJ1dHRvbkNvbG9yIiwiY29uZmlybUJ1dHRvblRleHQiLCJjYW5jZWxCdXR0b25UZXh0IiwiaXNDb25maXJtZWQiLCJyZW1vdmVyVXN1YXJpb0RhTWVzYSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIm1haW4iLCJOdW1iZXIiLCJidXR0b24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/mesa/[id]/page.tsx\n"));

/***/ })

});
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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _page_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page.css */ \"(app-pages-browser)/./src/app/mesa/[id]/page.css\");\n/* harmony import */ var _components_Biblioteca_biblioteca__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/Biblioteca/biblioteca */ \"(app-pages-browser)/./src/components/Biblioteca/biblioteca.tsx\");\n/* harmony import */ var _components_Chat_chat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/Chat/chat */ \"(app-pages-browser)/./src/components/Chat/chat.tsx\");\n/* harmony import */ var _components_Jogadores_jogadores__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/Jogadores/jogadores */ \"(app-pages-browser)/./src/components/Jogadores/jogadores.tsx\");\n/* harmony import */ var _components_Sidebar_sidebar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/Sidebar/sidebar */ \"(app-pages-browser)/./src/components/Sidebar/sidebar.tsx\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! sweetalert2 */ \"(app-pages-browser)/./node_modules/sweetalert2/dist/sweetalert2.all.js\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_8__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n // Importando SweetAlert\nconst Mesa = ()=>{\n    _s();\n    const { id: mesaId } = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)();\n    const [idUsuarioLocal, setIdUsuarioLocal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [refreshKey, setRefreshKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [isUserAdded, setIsUserAdded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const id = localStorage.getItem(\"client_key\");\n        if (id) {\n            setIdUsuarioLocal(id);\n        }\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const adicionarUsuarioNaMesa = async ()=>{\n            if (!idUsuarioLocal || isUserAdded) return;\n            try {\n                const response = await fetch(\"\".concat(\"http://localhost:3004\", \"/mesas/\").concat(mesaId, \"/usuarios/\").concat(idUsuarioLocal), {\n                    method: \"POST\",\n                    headers: {\n                        \"Content-Type\": \"application/json\"\n                    }\n                });\n                if (response.ok) {\n                    setIsUserAdded(true);\n                    setRefreshKey((prevKey)=>prevKey + 1);\n                } else {\n                    console.error(\"Erro ao adicionar usu\\xe1rio \\xe0 mesa\");\n                }\n            } catch (error) {\n                console.error(\"Erro na requisi\\xe7\\xe3o para adicionar usu\\xe1rio \\xe0 mesa\", error);\n            }\n        };\n        if (idUsuarioLocal) {\n            adicionarUsuarioNaMesa();\n        }\n    }, [\n        mesaId,\n        idUsuarioLocal,\n        isUserAdded\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const removerUsuarioDaMesa = async ()=>{\n            if (!idUsuarioLocal) return;\n            try {\n                const response = await fetch(\"\".concat(\"http://localhost:3004\", \"/mesas/\").concat(mesaId, \"/usuarios/\").concat(idUsuarioLocal), {\n                    method: \"DELETE\",\n                    headers: {\n                        \"Content-Type\": \"application/json\"\n                    }\n                });\n                if (!response.ok) {\n                    console.error(\"Erro ao remover usu\\xe1rio da mesa\");\n                }\n            } catch (error) {\n                console.error(\"Erro na requisi\\xe7\\xe3o para remover usu\\xe1rio da mesa\", error);\n            }\n        };\n        const handleBeforeUnload = async (event)=>{\n            const result = await sweetalert2__WEBPACK_IMPORTED_MODULE_8___default().fire({\n                title: \"Sair da Mesa?\",\n                text: \"Voc\\xea tem certeza que deseja sair?\",\n                icon: \"warning\",\n                showCancelButton: true,\n                confirmButtonColor: \"#3085d6\",\n                cancelButtonColor: \"#d33\",\n                confirmButtonText: \"Sim, sair!\",\n                cancelButtonText: \"N\\xe3o, ficar!\"\n            });\n            if (result.isConfirmed) {\n                // Se o usuário confirmar a saída, removemos o usuário e fechamos a aba\n                await removerUsuarioDaMesa();\n                window.location.href = \"/\"; // Redireciona para a home\n            } else {\n                // Se o usuário cancelar, não fazemos nada\n                event.returnValue = \"\"; // Para alguns navegadores\n            }\n        };\n        window.addEventListener(\"beforeunload\", handleBeforeUnload);\n        return ()=>{\n            window.removeEventListener(\"beforeunload\", handleBeforeUnload);\n            removerUsuarioDaMesa();\n        };\n    }, [\n        mesaId,\n        idUsuarioLocal\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Sidebar_sidebar__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Jogadores_jogadores__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                        mesaId: Number(mesaId)\n                    }, refreshKey, false, {\n                        fileName: \"C:\\\\Users\\\\Victor\\\\OneDrive\\\\\\xc1rea de Trabalho\\\\Proj Integrador\\\\projeto-nexus\\\\main\\\\src\\\\app\\\\mesa\\\\[id]\\\\page.tsx\",\n                        lineNumber: 105,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Biblioteca_biblioteca__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Victor\\\\OneDrive\\\\\\xc1rea de Trabalho\\\\Proj Integrador\\\\projeto-nexus\\\\main\\\\src\\\\app\\\\mesa\\\\[id]\\\\page.tsx\",\n                        lineNumber: 106,\n                        columnNumber: 17\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Victor\\\\OneDrive\\\\\\xc1rea de Trabalho\\\\Proj Integrador\\\\projeto-nexus\\\\main\\\\src\\\\app\\\\mesa\\\\[id]\\\\page.tsx\",\n                lineNumber: 104,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Chat_chat__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Victor\\\\OneDrive\\\\\\xc1rea de Trabalho\\\\Proj Integrador\\\\projeto-nexus\\\\main\\\\src\\\\app\\\\mesa\\\\[id]\\\\page.tsx\",\n                lineNumber: 108,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Victor\\\\OneDrive\\\\\\xc1rea de Trabalho\\\\Proj Integrador\\\\projeto-nexus\\\\main\\\\src\\\\app\\\\mesa\\\\[id]\\\\page.tsx\",\n        lineNumber: 103,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Mesa, \"1YJLzC55i+9P+hi9SxhybDLGFOk=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams\n    ];\n});\n_c = Mesa;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Mesa);\nvar _c;\n$RefreshReg$(_c, \"Mesa\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbWVzYS9baWRdL3BhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ21EO0FBQ1A7QUFDeEI7QUFDd0M7QUFDbEI7QUFDZTtBQUNOO0FBQ3BCLENBQUMsd0JBQXdCO0FBRXhELE1BQU1TLE9BQU87O0lBQ1QsTUFBTSxFQUFFQyxJQUFJQyxNQUFNLEVBQUUsR0FBR1IsMERBQVNBO0lBQ2hDLE1BQU0sQ0FBQ1MsZ0JBQWdCQyxrQkFBa0IsR0FBR1gsK0NBQVFBLENBQWdCO0lBQ3BFLE1BQU0sQ0FBQ1ksWUFBWUMsY0FBYyxHQUFHYiwrQ0FBUUEsQ0FBQztJQUM3QyxNQUFNLENBQUNjLGFBQWFDLGVBQWUsR0FBR2YsK0NBQVFBLENBQUM7SUFFL0NELGdEQUFTQSxDQUFDO1FBQ04sTUFBTVMsS0FBS1EsYUFBYUMsT0FBTyxDQUFDO1FBQ2hDLElBQUlULElBQUk7WUFDSkcsa0JBQWtCSDtRQUN0QjtJQUNKLEdBQUcsRUFBRTtJQUVMVCxnREFBU0EsQ0FBQztRQUNOLE1BQU1tQix5QkFBeUI7WUFDM0IsSUFBSSxDQUFDUixrQkFBa0JJLGFBQWE7WUFFcEMsSUFBSTtnQkFDQSxNQUFNSyxXQUFXLE1BQU1DLE1BQU0sR0FBNENYLE9BQXpDWSx1QkFBK0IsRUFBQyxXQUE0QlgsT0FBbkJELFFBQU8sY0FBMkIsT0FBZkMsaUJBQWtCO29CQUMxR2MsUUFBUTtvQkFDUkMsU0FBUzt3QkFDTCxnQkFBZ0I7b0JBQ3BCO2dCQUNKO2dCQUVBLElBQUlOLFNBQVNPLEVBQUUsRUFBRTtvQkFDYlgsZUFBZTtvQkFDZkYsY0FBY2MsQ0FBQUEsVUFBV0EsVUFBVTtnQkFDdkMsT0FBTztvQkFDSEMsUUFBUUMsS0FBSyxDQUFDO2dCQUNsQjtZQUNKLEVBQUUsT0FBT0EsT0FBTztnQkFDWkQsUUFBUUMsS0FBSyxDQUFDLGdFQUFvREE7WUFDdEU7UUFDSjtRQUVBLElBQUluQixnQkFBZ0I7WUFDaEJRO1FBQ0o7SUFDSixHQUFHO1FBQUNUO1FBQVFDO1FBQWdCSTtLQUFZO0lBRXhDZixnREFBU0EsQ0FBQztRQUNOLE1BQU0rQix1QkFBdUI7WUFDekIsSUFBSSxDQUFDcEIsZ0JBQWdCO1lBRXJCLElBQUk7Z0JBQ0EsTUFBTVMsV0FBVyxNQUFNQyxNQUFNLEdBQTRDWCxPQUF6Q1ksdUJBQStCLEVBQUMsV0FBNEJYLE9BQW5CRCxRQUFPLGNBQTJCLE9BQWZDLGlCQUFrQjtvQkFDMUdjLFFBQVE7b0JBQ1JDLFNBQVM7d0JBQ0wsZ0JBQWdCO29CQUNwQjtnQkFDSjtnQkFFQSxJQUFJLENBQUNOLFNBQVNPLEVBQUUsRUFBRTtvQkFDZEUsUUFBUUMsS0FBSyxDQUFDO2dCQUNsQjtZQUNKLEVBQUUsT0FBT0EsT0FBTztnQkFDWkQsUUFBUUMsS0FBSyxDQUFDLDREQUFtREE7WUFDckU7UUFDSjtRQUVBLE1BQU1FLHFCQUFxQixPQUFPQztZQUM5QixNQUFNQyxTQUFTLE1BQU0zQix1REFBUyxDQUFDO2dCQUMzQjZCLE9BQU87Z0JBQ1BDLE1BQU07Z0JBQ05DLE1BQU07Z0JBQ05DLGtCQUFrQjtnQkFDbEJDLG9CQUFvQjtnQkFDcEJDLG1CQUFtQjtnQkFDbkJDLG1CQUFtQjtnQkFDbkJDLGtCQUFrQjtZQUN0QjtZQUVBLElBQUlULE9BQU9VLFdBQVcsRUFBRTtnQkFDcEIsdUVBQXVFO2dCQUN2RSxNQUFNYjtnQkFDTmMsT0FBT0MsUUFBUSxDQUFDQyxJQUFJLEdBQUcsS0FBSywwQkFBMEI7WUFDMUQsT0FBTztnQkFDSCwwQ0FBMEM7Z0JBQzFDZCxNQUFNZSxXQUFXLEdBQUcsSUFBSSwwQkFBMEI7WUFDdEQ7UUFDSjtRQUVBSCxPQUFPSSxnQkFBZ0IsQ0FBQyxnQkFBZ0JqQjtRQUV4QyxPQUFPO1lBQ0hhLE9BQU9LLG1CQUFtQixDQUFDLGdCQUFnQmxCO1lBQzNDRDtRQUNKO0lBQ0osR0FBRztRQUFDckI7UUFBUUM7S0FBZTtJQUUzQixxQkFDSSw4REFBQ3dDOzswQkFDRyw4REFBQzdDLG1FQUFPQTs7a0NBQ0osOERBQUNELHVFQUFTQTt3QkFBQ0ssUUFBUTBDLE9BQU8xQzt1QkFBY0c7Ozs7O2tDQUN4Qyw4REFBQ1YseUVBQVVBOzs7Ozs7Ozs7OzswQkFFZiw4REFBQ0MsNkRBQUlBOzs7Ozs7Ozs7OztBQUdqQjtHQXBHTUk7O1FBQ3FCTixzREFBU0E7OztLQUQ5Qk07QUFzR04sK0RBQWVBLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9tZXNhL1tpZF0vcGFnZS50c3g/MjYyYyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIlxyXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlUGFyYW1zIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcclxuaW1wb3J0ICcuL3BhZ2UuY3NzJztcclxuaW1wb3J0IEJpYmxpb3RlY2EgZnJvbSAnQC9jb21wb25lbnRzL0JpYmxpb3RlY2EvYmlibGlvdGVjYSc7XHJcbmltcG9ydCBDaGF0IGZyb20gJ0AvY29tcG9uZW50cy9DaGF0L2NoYXQnO1xyXG5pbXBvcnQgSm9nYWRvcmVzIGZyb20gJ0AvY29tcG9uZW50cy9Kb2dhZG9yZXMvam9nYWRvcmVzJztcclxuaW1wb3J0IFNpZGViYXIgZnJvbSAnQC9jb21wb25lbnRzL1NpZGViYXIvc2lkZWJhcic7XHJcbmltcG9ydCBTd2FsIGZyb20gJ3N3ZWV0YWxlcnQyJzsgLy8gSW1wb3J0YW5kbyBTd2VldEFsZXJ0XHJcblxyXG5jb25zdCBNZXNhID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBpZDogbWVzYUlkIH0gPSB1c2VQYXJhbXMoKTtcclxuICAgIGNvbnN0IFtpZFVzdWFyaW9Mb2NhbCwgc2V0SWRVc3VhcmlvTG9jYWxdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XHJcbiAgICBjb25zdCBbcmVmcmVzaEtleSwgc2V0UmVmcmVzaEtleV0gPSB1c2VTdGF0ZSgwKTtcclxuICAgIGNvbnN0IFtpc1VzZXJBZGRlZCwgc2V0SXNVc2VyQWRkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gICAgXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjbGllbnRfa2V5XCIpO1xyXG4gICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICBzZXRJZFVzdWFyaW9Mb2NhbChpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWRpY2lvbmFyVXN1YXJpb05hTWVzYSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpZFVzdWFyaW9Mb2NhbCB8fCBpc1VzZXJBZGRlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfVVJMX0FQSX0vbWVzYXMvJHttZXNhSWR9L3VzdWFyaW9zLyR7aWRVc3VhcmlvTG9jYWx9YCwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0SXNVc2VyQWRkZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UmVmcmVzaEtleShwcmV2S2V5ID0+IHByZXZLZXkgKyAxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJybyBhbyBhZGljaW9uYXIgdXN1w6FyaW8gw6AgbWVzYScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJybyBuYSByZXF1aXNpw6fDo28gcGFyYSBhZGljaW9uYXIgdXN1w6FyaW8gw6AgbWVzYScsIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChpZFVzdWFyaW9Mb2NhbCkge1xyXG4gICAgICAgICAgICBhZGljaW9uYXJVc3VhcmlvTmFNZXNhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW21lc2FJZCwgaWRVc3VhcmlvTG9jYWwsIGlzVXNlckFkZGVkXSk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCByZW1vdmVyVXN1YXJpb0RhTWVzYSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpZFVzdWFyaW9Mb2NhbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfVVJMX0FQSX0vbWVzYXMvJHttZXNhSWR9L3VzdWFyaW9zLyR7aWRVc3VhcmlvTG9jYWx9YCwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJybyBhbyByZW1vdmVyIHVzdcOhcmlvIGRhIG1lc2EnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gbmEgcmVxdWlzacOnw6NvIHBhcmEgcmVtb3ZlciB1c3XDoXJpbyBkYSBtZXNhJywgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgaGFuZGxlQmVmb3JlVW5sb2FkID0gYXN5bmMgKGV2ZW50OiBCZWZvcmVVbmxvYWRFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdTYWlyIGRhIE1lc2E/JyxcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiVm9jw6ogdGVtIGNlcnRlemEgcXVlIGRlc2VqYSBzYWlyP1wiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnU2ltLCBzYWlyIScsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnTsOjbywgZmljYXIhJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaXNDb25maXJtZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNlIG8gdXN1w6FyaW8gY29uZmlybWFyIGEgc2HDrWRhLCByZW1vdmVtb3MgbyB1c3XDoXJpbyBlIGZlY2hhbW9zIGEgYWJhXHJcbiAgICAgICAgICAgICAgICBhd2FpdCByZW1vdmVyVXN1YXJpb0RhTWVzYSgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7IC8vIFJlZGlyZWNpb25hIHBhcmEgYSBob21lXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZSBvIHVzdcOhcmlvIGNhbmNlbGFyLCBuw6NvIGZhemVtb3MgbmFkYVxyXG4gICAgICAgICAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSAnJzsgLy8gUGFyYSBhbGd1bnMgbmF2ZWdhZG9yZXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBoYW5kbGVCZWZvcmVVbmxvYWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgaGFuZGxlQmVmb3JlVW5sb2FkKTtcclxuICAgICAgICAgICAgcmVtb3ZlclVzdWFyaW9EYU1lc2EoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSwgW21lc2FJZCwgaWRVc3VhcmlvTG9jYWxdKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxtYWluPlxyXG4gICAgICAgICAgICA8U2lkZWJhcj5cclxuICAgICAgICAgICAgICAgIDxKb2dhZG9yZXMgbWVzYUlkPXtOdW1iZXIobWVzYUlkKX0ga2V5PXtyZWZyZXNoS2V5fSAvPlxyXG4gICAgICAgICAgICAgICAgPEJpYmxpb3RlY2EgLz5cclxuICAgICAgICAgICAgPC9TaWRlYmFyPlxyXG4gICAgICAgICAgICA8Q2hhdCAvPlxyXG4gICAgICAgIDwvbWFpbj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZXNhO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVBhcmFtcyIsIkJpYmxpb3RlY2EiLCJDaGF0IiwiSm9nYWRvcmVzIiwiU2lkZWJhciIsIlN3YWwiLCJNZXNhIiwiaWQiLCJtZXNhSWQiLCJpZFVzdWFyaW9Mb2NhbCIsInNldElkVXN1YXJpb0xvY2FsIiwicmVmcmVzaEtleSIsInNldFJlZnJlc2hLZXkiLCJpc1VzZXJBZGRlZCIsInNldElzVXNlckFkZGVkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImFkaWNpb25hclVzdWFyaW9OYU1lc2EiLCJyZXNwb25zZSIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1VSTF9BUEkiLCJtZXRob2QiLCJoZWFkZXJzIiwib2siLCJwcmV2S2V5IiwiY29uc29sZSIsImVycm9yIiwicmVtb3ZlclVzdWFyaW9EYU1lc2EiLCJoYW5kbGVCZWZvcmVVbmxvYWQiLCJldmVudCIsInJlc3VsdCIsImZpcmUiLCJ0aXRsZSIsInRleHQiLCJpY29uIiwic2hvd0NhbmNlbEJ1dHRvbiIsImNvbmZpcm1CdXR0b25Db2xvciIsImNhbmNlbEJ1dHRvbkNvbG9yIiwiY29uZmlybUJ1dHRvblRleHQiLCJjYW5jZWxCdXR0b25UZXh0IiwiaXNDb25maXJtZWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJyZXR1cm5WYWx1ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWFpbiIsIk51bWJlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/mesa/[id]/page.tsx\n"));

/***/ })

});
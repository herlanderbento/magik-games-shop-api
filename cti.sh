#!/bin/sh

npm run cti create './src/@shared/application' -- -i '*spec.ts' -b && 
npm run cti create './src/@shared/domain' -- -i '*spec.ts' -e 'tests' -b && 
npm run cti create './src/@shared/infra' -- -i '*spec.ts' -i 'migrator-cli.ts' -b &&

npm run cti create './src/modules/category/application' -- -i '*spec.ts' -b && 
npm run cti create './src/modules/category/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/modules/category/infra' -- -i '*spec.ts' -b &&

# npm run cti create './src/modules/order/application' -- -i '*spec.ts' -b && 
# npm run cti create './src/modules/order/domain' -- -i '*spec.ts' -b && 
# npm run cti create './src/modules/order/infra' -- -i '*spec.ts' -b && 

npm run cti create './src/modules/product/application' -- -i '*spec.ts' -b && 
npm run cti create './src/modules/product/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/modules/product/infra' -- -i '*spec.ts' -b 
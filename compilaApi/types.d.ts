export interface Response {
    contracts: Contracts
    errors: Error[]
    sources: Sources
}

export interface Contracts {
    "Contract.sol": ContractSol
}

export interface ContractSol {
    Hello: Hello
}

export interface Hello {
    abi: Abi[]
    devdoc: Devdoc
    evm: Evm
    metadata: string
    storageLayout: StorageLayout
    userdoc: Userdoc
}

export interface Abi {
    inputs: any[]
    name: string
    outputs: Output[]
    stateMutability: string
    type: string
}

export interface Output {
    internalType: string
    name: string
    type: string
}

export interface Devdoc {
    kind: string
    methods: Methods
    version: number
}

export interface Methods { }

export interface Evm {
    assembly: string
    bytecode: Bytecode
    deployedBytecode: DeployedBytecode
    gasEstimates: GasEstimates
    legacyAssembly: LegacyAssembly
    methodIdentifiers: MethodIdentifiers
}

export interface Bytecode {
    functionDebugData: FunctionDebugData
    generatedSources: any[]
    linkReferences: LinkReferences
    object: string
    opcodes: string
    sourceMap: string
}

export interface FunctionDebugData { }

export interface LinkReferences { }

export interface DeployedBytecode {
    functionDebugData: FunctionDebugData2
    generatedSources: GeneratedSource[]
    immutableReferences: ImmutableReferences
    linkReferences: LinkReferences2
    object: string
    opcodes: string
    sourceMap: string
}

export interface FunctionDebugData2 {
    "@sayHello_9": SayHello9
    abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack: AbiEncodeTStringMemoryPtrToTStringMemoryPtrFromStack
    abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed: AbiEncodeTupleTStringMemoryPtrToTStringMemoryPtrFromStackReversed
    array_length_t_string_memory_ptr: ArrayLengthTStringMemoryPtr
    array_storeLengthForEncoding_t_string_memory_ptr_fromStack: ArrayStoreLengthForEncodingTStringMemoryPtrFromStack
    copy_memory_to_memory_with_cleanup: CopyMemoryToMemoryWithCleanup
    round_up_to_mul_of_32: RoundUpToMulOf32
}

export interface SayHello9 {
    entryPoint: number
    id: number
    parameterSlots: number
    returnSlots: number
}

export interface AbiEncodeTStringMemoryPtrToTStringMemoryPtrFromStack {
    entryPoint: number
    id: any
    parameterSlots: number
    returnSlots: number
}

export interface AbiEncodeTupleTStringMemoryPtrToTStringMemoryPtrFromStackReversed {
    entryPoint: number
    id: any
    parameterSlots: number
    returnSlots: number
}

export interface ArrayLengthTStringMemoryPtr {
    entryPoint: number
    id: any
    parameterSlots: number
    returnSlots: number
}

export interface ArrayStoreLengthForEncodingTStringMemoryPtrFromStack {
    entryPoint: number
    id: any
    parameterSlots: number
    returnSlots: number
}

export interface CopyMemoryToMemoryWithCleanup {
    entryPoint: number
    id: any
    parameterSlots: number
    returnSlots: number
}

export interface RoundUpToMulOf32 {
    entryPoint: number
    id: any
    parameterSlots: number
    returnSlots: number
}

export interface GeneratedSource {
    ast: Ast
    contents: string
    id: number
    language: string
    name: string
}

export interface Ast {
    nativeSrc: string
    nodeType: string
    src: string
    statements: Statement[]
}

export interface Statement {
    body: Body
    name: string
    nativeSrc: string
    nodeType: string
    parameters: Parameter[]
    returnVariables?: ReturnVariable[]
    src: string
}

export interface Body {
    nativeSrc: string
    nodeType: string
    src: string
    statements: Statement2[]
}

export interface Statement2 {
    nativeSrc: string
    nodeType: string
    src: string
    value?: Value
    variableNames?: VariableName[]
    expression?: Expression
    variables?: Variable[]
}

export interface Value {
    arguments: Argument[]
    functionName: FunctionName2
    nativeSrc: string
    nodeType: string
    src: string
}

export interface Argument {
    name?: string
    nativeSrc: string
    nodeType: string
    src: string
    arguments?: Argument2[]
    functionName?: FunctionName
    kind?: string
    type?: string
    value?: string
}

export interface Argument2 {
    kind?: string
    nativeSrc: string
    nodeType: string
    src: string
    type?: string
    value?: string
    name?: string
}

export interface FunctionName {
    name: string
    nativeSrc: string
    nodeType: string
    src: string
}

export interface FunctionName2 {
    name: string
    nativeSrc: string
    nodeType: string
    src: string
}

export interface VariableName {
    name: string
    nativeSrc: string
    nodeType: string
    src: string
}

export interface Expression {
    arguments: Argument3[]
    functionName: FunctionName4
    nativeSrc: string
    nodeType: string
    src: string
}

export interface Argument3 {
    name?: string
    nativeSrc: string
    nodeType: string
    src: string
    arguments?: Argument4[]
    functionName?: FunctionName3
    kind?: string
    type?: string
    value?: string
}

export interface Argument4 {
    name?: string
    nativeSrc: string
    nodeType: string
    src: string
    kind?: string
    type?: string
    value?: string
}

export interface FunctionName3 {
    name: string
    nativeSrc: string
    nodeType: string
    src: string
}

export interface FunctionName4 {
    name: string
    nativeSrc: string
    nodeType: string
    src: string
}

export interface Variable {
    name: string
    nativeSrc: string
    nodeType: string
    src: string
    type: string
}

export interface Parameter {
    name: string
    nativeSrc: string
    nodeType: string
    src: string
    type: string
}

export interface ReturnVariable {
    name: string
    nativeSrc: string
    nodeType: string
    src: string
    type: string
}

export interface ImmutableReferences { }

export interface LinkReferences2 { }

export interface GasEstimates {
    creation: Creation
    external: External
}

export interface Creation {
    codeDepositCost: string
    executionCost: string
    totalCost: string
}

export interface External {
    "sayHello()": string
}

export interface LegacyAssembly {
    ".code": Code[]
    ".data": Data
    sourceList: string[]
}

export interface Code {
    begin: number
    end: number
    name: string
    source: number
    value?: string
}

export interface Data {
    "0": N0
}

export interface N0 {
    ".auxdata": string
    ".code": Code2[]
}

export interface Code2 {
    begin: number
    end: number
    name: string
    source: number
    value?: string
    jumpType?: string
}

export interface MethodIdentifiers {
    "sayHello()": string
}

export interface StorageLayout {
    storage: any[]
    types: any
}

export interface Userdoc {
    kind: string
    methods: Methods2
    version: number
}

export interface Methods2 { }

export interface Error {
    component: string
    errorCode: string
    formattedMessage: string
    message: string
    severity: string
    sourceLocation: SourceLocation
    type: string
}

export interface SourceLocation {
    end: number
    file: string
    start: number
}

export interface Sources {
    "Contract.sol": ContractSol2
}

export interface ContractSol2 {
    id: number
}
